import mongoose from "mongoose";

const EventApplicationSchema=new mongoose.Schema({
    ApplyingTeam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team"
    },
    status:{
        type:String,
        enum:[pending,accepted,rejected]
    },
    Event:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }
})

export const EventApplication=mongoose.model("EventApplication",EventApplicationSchema)