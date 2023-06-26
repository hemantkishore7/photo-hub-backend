import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const verifyToken = async(req,res,next)=>{
      const {authorization} = req.headers;
      if(!authorization){
        return res.status(401).json('Invalid Authorization')
      }
      const token = authorization.replace('Bearer',' ').trim();

    try {
     const data = jwt.verify(token,process.env.KEY)
       req.user = data;
       next();
      
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}