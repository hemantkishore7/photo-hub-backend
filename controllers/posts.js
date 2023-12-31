import Post from "../models/Post.js"
import User from "../models/Users.js"

//Create post
export const createPost = async(req,res)=>{
    try {
        const {userId,picturePath,description} = req.body;
        const user = await User.findById(userId);
        const newPost = await Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            description,
            picturePath,
            userPicturePath:user.picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

//Generate all post on feed
export const getFeedPosts = async(req,res)=>{
    let post;
    try {
        post = await Post.find()
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    if(!post){
        return res.status(500).json("Internel server error")
    }
    res.status(200).json(post)
} 


//Generate particular user post
export const getUserPosts = async(req,res)=>{
    try {
        const {userId} = req.params;
       const post = await Post.find({userId})
       res.status(200).json(post)

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

//Update the like
export const likePost = async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,{likes:post.likes},{new:true}
        );

        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

//Add comment
export const addComment = async(req,res)=>{
    try {
        const {id} =req.params;
        const comment = {
            text:req.body.text,
            postedBy:req.user._id,
            profilePic:req.user.picturePath
        }
     const post = await Post.findByIdAndUpdate(id,{
        $push:{comments:comment}    
     },{new:true})
    
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
