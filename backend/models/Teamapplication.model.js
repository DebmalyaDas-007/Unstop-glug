import mongoose from "mongoose";

const TeamapplicationSchema= new mongoose.Schema({
    Team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        reqquired:true
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