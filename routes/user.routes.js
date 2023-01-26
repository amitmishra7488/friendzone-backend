const {createUser} = require ('../controllers/user.controller')
const express = require('express')

const routes= express.Router();

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


module.exports=routes;