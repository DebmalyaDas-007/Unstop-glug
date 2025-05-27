import mongoose from "mongoose";

const EventSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    coverImage:{
        type:String
    },
    maxRounds:{
        type:Number,
        default:1,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    prizePool:{
        type:Number
    },
    eligibility:{
        type:String
    },
    Rounds:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Round'
        }
    ],
    maxTeams:{
        type:Number,
        required:true
    },
    Teams:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Team'
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Event=mongoose.model('Event',EventSchema)