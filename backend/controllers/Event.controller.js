import { Event } from "../models/Event.model.js";
import User from "../models/User.model.js"
export const RegisterEvent=async(req,res)=>{
 try {
       const {title,maxRounds,date,maxTeams,category}=req.body;
       if(!title||!maxRounds||!date||!maxTeams||!category){
        return res.status(400).json({
            message:"fields missing",
            success:false
        })
       }
       const checkevent=await Event.findOne({title});
       if(checkevent){
        return res.status(400).json({
            message:"event exists by same name",
            success:false
        })
       }
       const UserId=req._id;
        const event =await Event.create({
        title,
        maxRounds:Number(maxRounds),
        date:Date(date),
        maxTeams:Number(maxTeams),
        category:category,
        createdBy:UserId
       })

       return res.status(200).json({
        message:"Event Created Succesfully",
        event,
        success:true
       })
 } catch (error) {
    console.log(error)
 }
}


//view all events to user

export const getAllEvents=async(req,res)=>{
    try {
        const keywords= req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keywords,$options:"i"}},
                {description:{$regex:keywords,$options:"i"}}
            ]
        }
        const events=await Event.find(query);
        if(!events){
            return res.status(400).json({
                message:"events not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"got all events",
            events,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getAdminEvents=async(req,res)=>{
    try {
        const adminId=req._id;
        const events=await Event.find({createdBy:adminId});
        if(events.length === 0){
            return res.status(400).json({
                message:"events not found",
                success:false
            })
        }
        return res.status(200).json({
            events,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getEventByid=async(req,res)=>{
    try {
        const eventId=req.params.id;
        const event= await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                message:"Events not found.",
                success:false
            })
        }
        return res.status(200).json({
            event,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}
export const UpdateEvent=async(req,res)=>{
    try {
        const {description,maxRounds,date,prizePool,maxTeams,eligibility,category}=req.body;
        const coverImage = req.file;
        if(eligibility){
            const eligibilityArray=eligibility.split(",")
        }
        const EventId=req.params.id;
        let event=await Event.findById(EventId);
        if(!event){
            return res.status(404).json({
                message:"no event exist",
                success:false
            })
        }
        if (event.createdBy.toString() !== req._id) {
            return res.status(403).json({
              message: "Only the event creator can update this event.",
              success: false,
            });
          }
       
        if(description) event.description=description;
        if(maxRounds)   event.maxRounds=maxRounds;
        if(date) event.date=date;
        if(prizePool) event.prizePool=prizePool;
        if(maxTeams) event.maxTeams=maxTeams
        if(eligibility) event.eligibility=eligibilityArray
        if(category)event.category=category
        
        await event.save();
        return res.status(200).json({
            message:"event updated succesfully",
            event,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

//admin function
export const deleteEvent=async(req,res)=>{
    try {
        const EventId=req.params.id;
        const event=await Event.findById(EventId);
        if(!event){
            return res.status(404).json({
                message:'Event not found',
                success:false
            })
        }
        if (event.createdBy.toString() !== req.user._id) {
            return res.status(403).json({
              message: "Only the event creator can delete this event.",
              success: false,
            });
          }
        await Event.findByIdAndDelete(EventId);
        return res.status(200).json({
            message:'event deleted succesfully',
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}



//collaborations


export const sendingCollaborationRequest=async(req,res)=>{
 try {
       const {email,designation}=req.body;
       const EventId=req.params.id;
           const event=await Event.findById(EventId);
       const user=await User.findOne({email:email});
       if(!user || user.role.toString() !=='admin'){
           return res.status(404).json({
               message:"No user found.",
               success:false
           })
       }
       if (event.createdBy.toString() !== req.user._id.toString()) {
           return res.status(403).json({
             message: "Only the event creator can manage collaborations of this event.",
             success: false,
           });
         }
         const alreadyCollaborator = event.collaborations.find(
            (collab) => collab.collaborator.toString() === user._id.toString()
          );

            if (alreadyCollaborator) {
            return res.status(409).json({
            message: "This user is already invited to collaborate.",
            success: false,
            });
        }
        event.collaborations.push({
            collaborator: user._id,
            designation:designation, // make sure this comes from the request
            status: 'pending'
          });
          
          await event.save();
          
          return res.status(200).json({
            message: "Collaboration request sent.",
            success: true
          });
 } catch (error) {
    console.log(error);
    
 }

}