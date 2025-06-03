import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
export const login=async(req,res)=>{
    try{
        const {name,email,phoneNumber,avatar,role}=req.body;
        if(!name||!email||!avatar||!role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }
     
        let user
        user = await User.findOne({email});
        if(!user){
            const newUser=new User({
                name,
                email,
                phoneNumber,
                avatar,
                role
            });
            await newUser.save();
            user = newUser;
        }
        const tokenData={
            userId:user._id,
            role:user.role,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            phoneNumber:user.phoneNumber
        }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{ expiresIn: '1d' });
        res.cookie('access_token',token,{
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error
        })
    }
} 
export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie('access_token',"",{maxAge:0}).json({
            message:"Logout successful",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUser=async(req,res)=>{
    try {
       const token = req.cookies.access_token; 
       if(!token){
        return res.status(403).json({
            success:false,
            message:"Unauthorized"
        })
       }
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch full user profile from DB
    const user = await User.findById(decoded.userId)
       res.status(200).json({
        success:true,
        user
       })
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })
        
    }
}