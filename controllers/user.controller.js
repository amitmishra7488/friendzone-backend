const userModel = require('../models/user.model')
const postModel = require('../models/post.model')
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
        else{
            const hashedPassword = await bcrypt.hash(data.password, 10);
            console.log(hashedPassword);
            data.password = hashedPassword;
            await userModel.create(data);
            return data;
        }
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

    const userExists = await userModel.findById(userId)
    const dummy= await postModel.find({"user":userId});
    const user={};
    const posts = dummy.map(el=> ({user:el.user}));
    try {
        if (userExists) {
            return {
                email: userExists.email,
                name: userExists.name,
                userName: userExists.userName,
                id: userExists._id,
                dp: userExists.dp,
                followers: userExists.followers,
                following: userExists.following,
                bio: userExists.bio,
                message: "Successfully found user",
                posts:posts
                
            }
        }
        else {
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

const getAllUser = async (userId) => {
    const suggestionBox = [];
    try {
        const following = await userModel.findOne({ _id: userId }).select('following');
        const suggestedUsers = await userModel.find({ _id: { $nin: following.following } });

        suggestedUsers.map(el => {
            const userData = {
                name: el.name,
                dp: el.dp,
                id:el._id
            }
            suggestionBox.push(userData)
        })
        return suggestionBox;
    }
    catch (error) {
        return {
            status: 'failed',
            message: 'Try to login again'
        }
    }


}


const following = async (data, userId) => {

    try {
        const following = await userModel.findByIdAndUpdate(data.id, { $push: { followers: userId } }, { new: true })

        const follower = await userModel.findByIdAndUpdate(userId, { $push: { following: data.id } }, { new: true })
        console.log(follower)
        return {
            status: 'success',
            message: "done"
        }
    }
    catch (error) {
        return {
            status: 'failed',
            message: "check ur password or email"
        }
    }

}

const userBioDp = async (userId, bio, dp,userName) => {

    try{
        if(bio =="" && userName==""){
            const userProfile = await userModel.findByIdAndUpdate(userId, { dp:dp }, { new: true});
            console.log(userProfile);
        }
        else if(dp =="" && userName==""){
            const userProfile = await userModel.findByIdAndUpdate(userId, { bio:bio }, { new: true});
            console.log(userProfile);
        }
        else if(bio =="" && userName==""){
            const userProfile = await userModel.findByIdAndUpdate(userId, { userName: userName }, { new: true});
            console.log(userProfile);
        }
        else{
            const userProfile = await userModel.findByIdAndUpdate(userId, { bio: bio,dp:dp,userName:userName }, { new: true});
            console.log(userProfile);
        }
        return {
            status: 'success',
            message: "done"
        }
    }
    catch(error) {
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
    getAllUser,
    userBioDp
}