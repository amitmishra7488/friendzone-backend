const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
    image: { type: String, required: true },
    caption: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
    { timestamps: true,}
)


const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;