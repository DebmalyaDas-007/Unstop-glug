import mongoose from "mongoose";

const TeamapplicationSchema= new mongoose.Schema({
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
})

export const TeamApplication=mongoose.model("TeamApplication",TeamapplicationSchema)