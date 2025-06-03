import mongoose from "mongoose";

const EventSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
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
    location:{
        type:String,
        required:true
    },
    prizePool:{
        type:Number,
        required:true
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
        enum:['coding','movies','sports','education','science','more'],
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