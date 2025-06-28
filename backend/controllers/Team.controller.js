import { Event } from "../models/Event.model.js";
import {Team} from "../models/Team.model.js"
import User from "../models/User.model.js";
export const viewAllTeams=async(req,res)=>{
   try {
     const eventId=req.params.eventId;
     const event =await Event.findById(eventId).populate("Teams");
     if(!event){
         return res.status(404).json({
             message:"event not found",
             success:false
         })
     }
     const teamsArray=event.Teams;
    return res.status(200).json({
         teams:teamsArray,
         success:true
     })
   } catch (error) {
    console.log(error)
   }
    
}


export const viewTeamById=async(req,res)=>{
    try {
        const eventId=req.params.eventId;
        const teamId=req.params.teamId;
        const team = await Team.findOne({ _id: teamId, eventId:eventId }).populate("members").populate("eventId");
        if(!team){
            return res.status(404).json({
                message:"Team not found.",
                success:false
            })
        }
        return res.status(200).json({
            team,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const createTeam=async(req,res)=>{
    
  try {
    const{TeamName}=req.body;
     const LeaderId=req._id;
     const eventId=req.params.eventId;
    const checkTeam=await Team.findOne({name:TeamName});
   
    if(checkTeam){
        return res.status(400).json({
            message:"You can not register same Team",
            success:false
        })
    }
    const checkEvent=await Event.findById(eventId)
    if(!checkEvent){
        return res.status(404).json({
            message:"Event not found.",
            success:false
        })
    }
    ;

    const checkLeader=await Team.findOne({teamLeader:LeaderId,eventId:eventId});
    if(checkLeader){
        return res.status(400).json({
            message:"You already registered a team",
            success:false
        })
    }
    const maxTeams=checkEvent.maxTeams;
    if (checkEvent.Teams.length===maxTeams){
        return res.status(400).json({
            message:"Max team participation reached",
            success:false
        })
    }
    const newTeam=await Team.create({
        name:TeamName,       
        teamLeader:LeaderId,
        eventId:eventId
    })
    const teamLeader=await User.findById(LeaderId);
    newTeam.members.push(teamLeader);
    await newTeam.save();
    checkEvent.Teams.push(newTeam._id);
    await checkEvent.save();

    return res.status(201).json({
        message:"Team Created successfully",
        newTeam,
        success:true
      })

  } catch (error) {
    console.log(error);
    
  }

}


export const myTeams = async (req, res) => {
  console.log("myTeams function called");
  try {
   
    const userId = req.user._id;
    const teams = await Team.find({ members: userId })
    .populate('eventId')
    .populate('teamLeader', 'name email')
    .populate('members', 'name email');

    if (teams.length === 0) {
      return res.status(400).json({
        message: "No teams found",
        success: false
      });
    }
    res.status(200).json({
      success: true,
      message: "Your teams found",
      teams
    });
  } catch (error) {
    console.error("Error fetching user's teams:", error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const deleteTeam=async(req,res)=>{
    try {
        const eventId=req.params.eventId;
        const teamId=req.params.teamId;
        const team = await Team.findOne({ _id: teamId, eventId:eventId });
        if(!team){
            return res.status(404).json({
                message:"Team not found.",
                success:false
            })
        }
        await Team.findByIdAndDelete(teamId);
        await Event.findByIdAndUpdate(eventId, {
            $pull: { teams: teamId }
          });
        return res.status(200).json({
            message: "Team deleted successfully.",
            success: true
          });
    } catch (error) {
        console.log(error);
        
    }
}
