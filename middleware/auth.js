import jwt from "jsonwebtoken";
import User from "../models/Users";

export const verifyToken = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if(!token){
            return res.status(403).send("Access denied")
        }
       
        const verified = jwt.verify(token,process.env.KEY)
        console.log(verified);
        const user = await User.findOne({_id:verified.id})
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}