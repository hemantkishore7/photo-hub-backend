import mongoose from "mongoose";

const postSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean
    },
    comments:[{
        type:String,
        postedBy:{
            type:mongoose.Types.ObjectId,
            ref:"user"
        }
    }]
},{timestamps:true})

const Post = mongoose.model("Post",postSchema)
export default Post;