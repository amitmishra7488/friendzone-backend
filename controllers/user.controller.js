const userModel =require('../models/user.model')

const createUser = async(data)=>{
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

module.exports={
    createUser
}