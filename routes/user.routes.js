const {createUser, loginUser} = require ('../controllers/user.controller')
const express = require('express')
const routes= express.Router();

// signup route
routes.post('/signup', async(req,res)=>{

    const user = req.body;
    const newUser= await createUser(user);
    console.log(newUser);
    if(newUser.status){
        res.status(400).json({ message: 'Error creating user' });
    }
    else{
        res.status(201).json({user:newUser,message: 'User created successfully'});
    }
})

// login route
routes.post('/login',async (req, res) => {
    const user = req.body;
    const newUser = await loginUser(user);
    console.log(newUser);
    if(newUser.status){
        res.status(404).json({ message: 'Error in login' });
    }
    else{
        res.status(200).json({user:newUser,message: 'User Logged In successfully'});
    }
})
module.exports=routes;