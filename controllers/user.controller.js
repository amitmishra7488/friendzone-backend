const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

const createUser = async (data) => {

    try {
        const userExist = await userModel.findOne({ email: data.email });
        if (userExist) {
            console.log("user already exists")
            return {
                status: "failed",
                message: "user already exists"
            }
        }

        // hashing password of user 
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log(hashedPassword);
        data.password = hashedPassword;
        await userModel.create(data);
        return data;
    }
    catch (e) {
        return {
            status: e._message,
        }
    }
}



const loginUser = async (data) => {

    const userExist = await userModel.findOne({ email: data.email });
    if (!userExist) {
        return {
            status: 'failed',
            message: "check ur password or email"
        }
    }
    try {
        // matching password
        const isPasswordCorrect = await bcrypt.compare(data.password, userExist.password);
        console.log(isPasswordCorrect);

        if (isPasswordCorrect) {
            return userExist;
        }
        else {
            return {
                status: 'failed',
                message: "check ur password or email"
            }
        }
    }
    catch (error) {
        return {
            status: 'failed',
            message: 'email and password required for login'
        }
    }

}

const userProfile = async (userId) => {

    const userExists = await userModel.findOne({ _id:userId})
    try {
        if(userExists) {
            return {
                email: userExists.email,
                name: userExists.name,
                id:userExists._id,
                message:"Successfully found user"
            }
        }
        else{
            return {
                status: 'failed',
                message: "check ur password or email"
            }
        }
    } catch (error) {
        return {
            status: 'failed',
            message: 'Try to login again'
        }
    }
}

const getAllUser = async () =>{
    const suggestionBox=[];
    try{
        const user = await userModel.find();
        user.map(el=>{
            const userData= {
                name: el.name,
                dp:el.dp
            }
            suggestionBox.push(userData)
        })
        return suggestionBox;
    }
    catch(error) {
        return {
            status: 'failed',
            message: 'Try to login again'
        }
    }


}


const following = async(data,userId)=>{
    

    try{
        const following=await userModel.findByIdAndUpdate(data.id, {$push: {followers: userId}},{new: true})

        const follower=await userModel.findByIdAndUpdate(userId, {$push: {following: data.id}},{new: true})
        console.log(follower)
        return {
            status: 'success',
            message:   "done"
        }
    }
    catch(error){
        return {
            status: 'failed',
            message: "check ur password or email"
        }
    }

}

module.exports = {
    createUser,
    loginUser,
    userProfile,
    following,
    getAllUser
}