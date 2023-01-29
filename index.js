const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes')
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(express.json());

// user main routes
app.use('/user', userRoutes);
app.use("/post", postRoutes);




connectDB();
app.listen(8080, () => {
    console.log("listening on port 8080");
})
