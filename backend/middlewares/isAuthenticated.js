import jwt from "jsonwebtoken";
import User from "../models/User.model.js"
const isAuthenticated= async(req,res,next)=>{
 try {
       const token=req.cookies.access_token;
       if(!token){
           return res.status(400).json({
               message:"Token doesnt exist",
               success:false
           })
       }
       const decode= jwt.verify(token,process.env.JWT_SECRET);
       if(!decode){
           return res.status(400).json({
               message: "User Unauthorized",
               success:false
           })
           
       }
       const user = await User.findById(decode.userId);
       if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
       req._id = decode.userId;
       req.user = user; 
       next();
 } catch (error) {
    console.log(error)
 }
}
export default isAuthenticated