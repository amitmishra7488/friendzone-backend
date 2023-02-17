const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    dp:{type: String, default:'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'},
    followers:[{type: Schema.Types.ObjectId, ref:"User"}],
    following:[{type: Schema.Types.ObjectId, ref:"User"}],
    bio:{type: String, default:"Add Bio" , minlength: 6}

}, { timestamps: true })


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;