import { Event } from "../models/Event.model.js";
export const RegisterEvent=async(req,res)=>{
 try {
       const {title,maxRounds,date,maxTeams}=req.body;
       if(!title||!maxRounds||!date||!maxTeams){
        return resizeBy.status(400).json({
            message:"fields missing",
            success:false
        })
       }
       const checkevent=Event.findOne({title});
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
        const {description,maxRounds,date,prizePool,maxTeams,eligibility}=req.body;
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
       
        if(description) event.description=description;
        if(maxRounds)   event.maxRounds=maxRounds;
        if(date) event.date=date;
        if(prizePool) event.prizePool=prizePool;
        if(maxTeams) event.maxTeams=maxTeams
        if(eligibility) event.eligibility=eligibilityArray
        
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
        await Event.findByIdAndDelete(EventId);
        return res.status(200).json({
            message:'event deleted succesfully',
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}