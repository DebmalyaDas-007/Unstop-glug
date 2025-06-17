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
      Team: teamId,
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
      Team: teamId,
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
  
  export const respondToArequest = async (req, res) => {
    try {
      const userId = req._id;
      const { response,teamApplicationId} = req.body;
      const eventId = req.params.eventId;
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          message: "Event doesn't exist.",
          success: false,
        });
      }
  
      const application = await TeamApplication.findOne({
        _id:teamApplicationId
      });
      if (!application) {
        return res.status(404).json({
          message: "Application doesn't exist.",
          success: false,
        });
      } 
      const teamId=application.Team;
      const team = await Team.findById(teamId).populate("members");
      if (!team) {
        return res.status(404).json({
          message: "Team doesn't exist.",
          success: false,
        });
      }
  
      if (team.members.length >= event.maxTeams) {
        return res.status(400).json({
          message: "Maximum team size reached.",
          success: false,
        });
      }
      const normalizedResponse = response.toLowerCase();
      if (normalizedResponse === "accepted") {
        if (team.members.some(member => member._id.toString() === userId.toString())) {
          return res.status(400).json({
            message: "User already in team.",
            success: false,
          });
        }
  
        application.status = "accepted";
        await application.save();
  
        team.members.push(userId);
        await team.save();
      } else if (normalizedResponse === "rejected") {
        application.status = "rejected";
        await application.save();
      } else {
        return res.status(400).json({
          message: "Invalid response. Use 'accepted' or 'rejected'.",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: `Application ${normalizedResponse} successfully.`,
        success: true,
        application,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error.",
        success: false,
      });
    }
  };
  