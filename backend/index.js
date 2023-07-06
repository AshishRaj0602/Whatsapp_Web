const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const ConversationRoute = require('./Routes/conversation');
const MessageRoute = require('./Routes/messageRoute');
const dotenv=require('dotenv');
dotenv.config();
const app = express();


mongoose.connect(`${process.env.URI}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }).then(()=>{
        console.log("Succefully connected to DB ")
    }).catch(err=>{
        console.log(err)
    })



app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/chats", ConversationRoute);
app.use("/api/chats",MessageRoute);
const port = process.env.PORT||5000;

app.listen(port,(req, res) => {
    console.log(`Server running on port: ${port}`);
});


module.exports={app};