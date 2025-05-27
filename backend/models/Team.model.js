import mongoose from "mongoose";

const TeamSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    teamLeader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    members:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        }
    ],
    eventId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    }
},{timestamps:true})

export const Team=mongoose.model('Team',TeamSchema)