import {Event} from "../models/Event.model.js";

export const viewAllCollaborationReq = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({
      "collaborations.collaborator": userId
    }).populate("collaborations.collaborator", "name email") 
      .populate("createdBy", "name email"); 

    const collaborations = [];
    events.forEach(event => {
      event.collaborations.forEach(collab => {
        if (collab.collaborator._id.toString() === userId.toString() && collab.status.toString()!=="rejected") {
          collaborations.push({
            eventId: event._id,
            eventTitle: event.title, 
            createdBy: event.createdBy,
      designation: collab.designation,
            status: collab.status
          });
        }
      });
    });

    return res.status(200).json({
      message: "Collaboration requests fetched successfully",
      success: true,
      data: collaborations
    });
  } catch (error) {
    console.log(error);
   
  }
};

export const respondCollaborationReq= async(req,res)=>{
  try {
    const userId = req.user._id;

    const {response,eventId}=req.body;
    const event=await Event.findById(eventId).populate("collaborations.collaborator")
    if(!event){
      return res.status(404).json({
        message:"event doesnt exist.",
        success:false
    })
    }
    let updated=false;
    event.collaborations.forEach(collab=>{
      if(collab.collaborator._id.toString()===userId.toString()){
        collab.status=response.toLowerCase();
        updated=true;
      }
    })
    await event.save();

    return res.status(200).json({
      message: `Collaboration ${response.toLowerCase()} successfully.`,
      success: true
    });
    
  }
 catch (error) {
    console.log(error);
    
  }
}