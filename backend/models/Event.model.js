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
    collaborations:[
        {
            collaborator: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            designation: {
              type: String,
              enum: ["manager", "judge", "mentor", "volunteer"]
            },
            status:{
                type:String,
                enum:["accepted","pending","rejected"],
                default:"pending"
            }
          }
    ],
    category:{
        type: String,
        enum:['movies','coding','sports','education','science','tech','festival','quiz','more'],
        default:'more',
        required:true
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