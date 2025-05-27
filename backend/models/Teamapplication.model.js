import mongoose from "mongoose";

const TeamapplicationSchema= new mongoose.Schema({
    Team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:[pending,accepted,rejected]
    }
})

const TeamApplication=mongoose.model("TeamApplication",TeamapplicationSchema)