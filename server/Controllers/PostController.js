import PostModel from "../models/PostModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// create New Post
export const createPost = async (req, res) => {
    try {
      // Create a new instance of PostModel using the request body
      const post = new PostModel(req.body);
      
      // Save the new post to the database
      const savedPost = await post.save();
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// get a post
 export const getPost = async(req, res)=>{
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 }

//  update a post
export const updatePost = async (req, res) => {
    const { id: postId } = req.params;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(postId);
      // Check if the user attempting to update the post is the owner
      if (post.userId === userId) {
        // Update the post with new data from the request body
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post successfully updated");
      } else {
        // If the user is not the owner, return a forbidden action message
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// delete a post 
export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(postId);
  
      // Check if the user making the request is the owner of the post
      if (post.userId === userId) {
        // If yes, delete the post
        await post.deleteOne();
        res.status(200).json("Post has been deleted successfully");
      } else {
        // If not, respond with an action forbidden message
        res.status(403).json("You are not authorized to perform this action");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// like and dislike a post 
export const likePost = async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;
    try {
        const post = await PostModel.findById(id);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push: {likes: userId}});
            res.status(200).json("Post liked")
        }else{
            await post.updateOne({$pull: {likes: userId}});
            res.status(200).json("Post disliked")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get timeline of post 
export const getTimeLinePost = async(req, res)=>{
    const userId = req.params.id;
    try {
        const currentUserPosts = await PostModel.find({userId: userId});
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project:{
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        res.status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
