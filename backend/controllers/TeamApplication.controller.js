import { application } from "express";
import { Event } from "../models/Event.model.js";
import {Team} from "../models/Team.model.js"
import {TeamApplication} from "../models/Teamapplication.model.js"
import User from "../models/User.model.js";
export const sendTeamReq = async (req, res) => {
  try {
    const { teamId, eventId } = req.params;
    const userId = req._id;

    const team = await Team.findOne({ _id: teamId, eventId });
    if (!team) {
      return res.status(404).json({
        message: "Team not found.",
        success: false
      });
    }
    if (team.members.some(member => member.toString() === userId.toString())) {
      return res.status(400).json({
        message: "User is already a team member.",
        success: false
      });
    }
    const existingApplication = await TeamApplication.findOne({
      team: teamId,
      applicant: userId,
      status: 'pending'  
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already sent a request to this team.",
        success: false
      });
    }
    const newTeamApplication = await TeamApplication.create({
      team: teamId,
      event: eventId,
      applicant: userId,
      status: 'pending'
    });

    return res.status(200).json({
      message: "Team application sent successfully.",
      newTeamApplication,
      success: true
    });

  } catch (error) {
    console.error("Error sending team request:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    });
  }
};



export const viewMyteam = async (req, res) => {
    try {
      const userId = req.user._id;
      const eventId = req.params.eventId;
  
      const event = await Event.findById(eventId).populate("Teams");
      if (!event) {
        return res.status(404).json({
          message: "Event doesn't exist.",
          success: false,
        });
      }
        for (const teamId of event.Teams) {
        const team = await Team.findById(teamId).populate("members");
  
        if (!team) continue;
  
        const isMember = team.members.some(
          (member) => member._id.toString() === userId.toString()
        );
  
        if (isMember) {
          return res.status(200).json({
            message: "Team found",
            myTeam: team,
            success: true,
          });
        }
      }
  
      return res.status(404).json({
        message: "No teams found for the user in this event",
        success: false,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  export const viewApplications = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const teams = await Team.find({ teamLeader: userId });
  
      if (teams.length === 0) {
        return res.status(404).json({
          message: "No teams found",
          success: false,
        });
      }
  
      const teamIds = teams.map(team => team._id);
      const applications = await TeamApplication.find({ Team: { $in: teamIds } })
        .populate('applicant')
        .populate('event')
        .populate('Team');     
  
      return res.status(200).json({
        message: "Applications found",
        applications,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  
  





  export const respondToArequest = async (req, res) => {
    try {
      // Assuming user ID is attached to req by auth middleware
      const reviewerId = req._id;
      const { response, teamApplicationId } = req.body;
      const { eventId } = req.params;
  
      // Fetch event
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          message: "Event doesn't exist.",
          success: false,
        });
      }
  
      // Fetch application
      const application = await TeamApplication.findById(teamApplicationId);
      if (!application) {
        return res.status(404).json({
          message: "Application doesn't exist.",
          success: false,
        });
      }
  
      // Fetch team and members
      const team = await Team.findById(application.team).populate("members");
      if (!team) {
        return res.status(404).json({
          message: "Team doesn't exist.",
          success: false,
        });
      }
  
      const applicantId = application.applicant.toString();
      const normalizedResponse = response.toLowerCase();
  
      if (normalizedResponse === "accepted") {
        // Check if applicant is already in the team
        if (team.members.some(member => member._id.toString() === applicantId)) {
          return res.status(400).json({
            message: "User already in team.",
            success: false,
          });
        }
  
        // Check if team is full (you hardcoded 6 here)
        if (team.members.length >= 6) {
          return res.status(400).json({
            message: "Team is already full.",
            success: false,
          });
        }
  
        // Add applicant to team
        team.members.push(applicantId);
        await team.save();
  
        // ✅ Delete application
        await TeamApplication.findByIdAndDelete(teamApplicationId);
  
        return res.status(200).json({
          message: "Application accepted and removed.",
          success: true,
        });
      }
  
      else if (normalizedResponse === "rejected") {
        // ✅ Just delete the application
        await TeamApplication.findByIdAndDelete(teamApplicationId);
  
        return res.status(200).json({
          message: "Application rejected and removed.",
          success: true,
        });
      }
  
      // Invalid input
      return res.status(400).json({
        message: "Invalid response. Use 'accepted' or 'rejected'.",
        success: false,
      });
  
    } catch (error) {
      console.error("Error responding to application:", error);
      return res.status(500).json({
        message: "Server error.",
        success: false,
      });
    }
  };
export const teamsRequested= async(req,res)=>{
try {
  const teamApps = await TeamApplication.find({ applicant: req.user._id })
  .populate('event')
  .populate('team');
    if(!teamApps || teamApps.length ===0){
      return res.status(400).json({
        message: "No applications found",
        success: false,
      });
    }
    return res.status(200).json({
      message:"team applications found",
      teamApps,
      success:true  
    })
} catch (error) {
  console.error("Error responding to application:", error);
  return res.status(500).json({
    message: "Server error.",
    success: false,
  });
}
}  