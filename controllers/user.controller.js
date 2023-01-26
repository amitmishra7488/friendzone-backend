const userModel =require('../models/user.model')
const bcrypt= require('bcrypt');

const createUser = async(data)=>{
    // hashing password of user 
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);
    data.password = hashedPassword;

    const userExist = await userModel.findOne({email: data.email});
    if(userExist){
        console.log("user already exists")
        return {
            status:"failed",
            message:"user already exists"
        }
    }
    await userModel.create(data);
    return data;
}



const loginUser = async(data) => {
    
    const userExist = await userModel.findOne({email:data.email});

    // comparing password of data entered by user and datbase
    const isPasswordCorrect = await bcrypt.compare(data.password, userExist.password);
    console.log(isPasswordCorrect); 


    if(isPasswordCorrect){
        return userExist;
    }
    else{
        return {
            status: 'failed',
            message:"check ur password or email"
        }
    };
}
module.exports={
    createUser,
    loginUser
}