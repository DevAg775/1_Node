const express = require("express");
const {connectMongoDb} = require('./connection')
const {logReqRes} = require('./middlewares')
const userRouter = require('./routes/user')


const app = express();
const PORT = 7000;

//connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() =>console.log("MongoDb connected!"))
.catch((err) => console.error("Error:", err.message));



//Middleware -plugin
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded
app.use(logReqRes('log.txt'));


//Routes
app.use("/api/user", userRouter );

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))