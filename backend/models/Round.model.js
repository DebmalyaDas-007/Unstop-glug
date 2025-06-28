import mongoose from "mongoose";

const RoundSchema=new mongoose.Schema({
    RoundNumber:{
        type:Number,
        required:true
    },
    instructions:{
        type:String
    },
    date:{
        type:Date,
        required:true
    },
    motherEvent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    totalTeams:{
        type:Number,
        required:true
    },
    requiredFiles:{
        type:String
    },
    selectedTeams:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team"
    }]
})

export const Round=mongoose.model("Round",RoundSchema)