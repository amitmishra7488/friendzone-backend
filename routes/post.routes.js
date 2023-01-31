const express = require('express');
const routes = express.Router();
const auth = require("../middleware/auth");
const postModel = require("../models/post.model");


routes.post("/create", auth, async (req, res) => {
    try {
        // console.log(req.userId, 'from here in post');
        console.log(req.userId, 'from here');
        const post = await postModel.create({ ...req.body, user: req.userId });
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

routes.get('/', async (req, res) => {
    try {
        const user = req.query.user;
        const searchQuery = user ? { user: user } : {};
      
        const posts = await postModel.find(searchQuery).populate("user", "name");
      
        return res.status(200).json(posts);
       } catch (error) {
        return res.status(500).json({ message: error.message });
       }
})

routes.get("/:id", async(req,res)=>{
    try {
        const {id} = req.params;

        const post= await postModel.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  
})




module.exports=routes;