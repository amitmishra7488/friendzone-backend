const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/user.routes')
const postRoutes = require("./routes/post.routes");

const app = express();
app.use(cors())
app.use(express.json());

// user main routes
app.use('/user', userRoutes);
app.use("/post", postRoutes);

app.get('/', async(req,res)=>{
    res.status(200).send("Welcome to friendZone!");
});




connectDB();
app.listen(8080, () => {
    console.log("listening on port 8080");
})
