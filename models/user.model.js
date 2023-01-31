const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    dp:{type: String, required: true},
    // follower:[{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;