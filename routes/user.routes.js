const { createUser, loginUser, userProfile, following,getAllUser, userBioDp } = require('../controllers/user.controller')
const express = require('express')
const routes = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = require('../middleware/auth');
const userModel = require('../models/user.model');


// signup route
routes.post('/signup', async (req, res) => {

    const user = req.body;
    
    const newUser = await createUser(user);
    
    console.log(newUser);
    try {
        if (newUser.status) {
            res.status(400).json(newUser);
        }
        else {
            res.status(201).json({ user: newUser, message: 'User created successfully' });
        }
    }
    catch (error) {
        res.status(504).json(error.message);
    }
})

// login route
routes.post('/login', async (req, res) => {
    const user = req.body;
    const newUser = await loginUser(user);
    console.log(newUser);

    if (newUser.status) {
        res.status(404).json(newUser);
    }
    else {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(200).send({ user: newUser, token: token, message: 'User Logged In successfully' });
    }
})



// single user profile route

routes.get('/profile', auth, async(req, res) => {
   
    const userId = req.userId;
    console.log("userID",userId)

    const profile = await userProfile(userId);
    console.log(profile);
    if (profile.status) {
        res.status(404).json(profile);
    }
    else{
        res.status(200).json({user:profile});
    }
});


routes.get('/suggestions', auth, async(req, res) => {
   const userId= req.userId;
    const user = await getAllUser(userId);
    console.log(user);
    if (user.status) {
        res.status(404).json(user);
    }
    else{
        res.status(200).json(user);
    }
});



routes.put("/followers",auth, async(req, res)=>{
    const userId=req.userId;

    const data = req.body;

    const result = await following(data,userId);
    console.log(result);

    if(result.status === "failed"){
        res.status(404).json({message:"not found glitch"})
    }
    else{
        res.status(200).json(result);
    }
})



routes.put("/bioDP", auth, async(req,res)=>{
    const userId = req.userId;
    console.log("userID",userId)
    let {bio,dp,userName} = req.body;

    const profile = await userBioDp(userId,bio,dp,userName)
    console.log(profile);

    if (profile.status=="failed") {
        res.status(404).json(profile);
    }
    else{
        res.status(200).json({user:profile})
    }

    

})

module.exports = routes;