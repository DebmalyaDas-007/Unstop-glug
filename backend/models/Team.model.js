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
    },
    teamApplications:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'TeamApplication'
    }
    ]
},{timestamps:true})

export const Team=mongoose.model('Team',TeamSchema)