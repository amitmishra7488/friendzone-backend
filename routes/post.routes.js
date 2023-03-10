const express = require('express');
const routes = express.Router();
const auth = require("../middleware/auth");
const postModel = require("../models/post.model");


routes.post("/create", auth, async (req, res) => {
    try {
        // console.log(req.userId, 'from here in post');
        console.log(req.userId, 'from here');
        const post = await postModel.create({ ...req.body, user: req.userId });
        const populatedPost = await postModel.findById(post._id).populate('user', 'dp userName name').exec();
        return res.status(201).json(populatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

routes.get('/', async (req, res) => {
    try {
        const user = req.query.user;
        const searchQuery = user ? { user: user } : {};
      
        const posts = await postModel.find(searchQuery).populate("user", "name dp").sort({createdAt:-1});
      
        return res.status(200).json(posts);
       } catch (error) {
        return res.status(500).json({ message: error.message });
       }
})

routes.get("/profilePost",auth, async(req,res)=>{
    try {
        const id = req.userId;

        const post = postModel.find({ user: id }).exec((err, docs) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving posts');
            } else {
                console.log(docs);
                res.status(200).json(docs);
            }
            });
        console.log(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  
})


routes.put("/like",auth,async(req,res)=>{
    try {
        const postId= req.body.id;
        const post = await postModel.findById(postId);
        post.likes.push(req.userId);
         postModel.findByIdAndUpdate(req.body.id, post, { new: true }, (error, updatedUser) => {
            if (error) return next(error);
            res.status(200).json(updatedUser);
          }).populate('likes',"name dp");

        // res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

routes.put("/unlike",auth,async(req,res)=>{
    try {
        const postId= req.body.id;
        const post = await postModel.findById(postId);
        console.log(post.likes,"likes")
        // post.likes= post.likes.filter(id => id!==`new ObjectId(${req.userId})`);

        const details= await postModel.findByIdAndUpdate(req.body.id, {$pull : {likes:req.userId}}, { new: true }, (error, updatedUser) => {
            if (error) return next(error);
            res.status(200).json(updatedUser);
          }).populate('likes','name dp');

        // res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
})




module.exports=routes;