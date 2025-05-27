import jwt from "jsonwebtoken";

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
       req._id = decode.userId;
       next();
 } catch (error) {
    console.log(error)
 }
}
export default isAuthenticated