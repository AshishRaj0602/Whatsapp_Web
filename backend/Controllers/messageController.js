const Message = require('../Models/messageModel');
const Conversation =require ('../Models/conversation');
 const newMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text });
        res.status(200).json("Message has been sent successfully");
    } catch (error) {
        res.status(500).json(error);
    }

}

const getMessage = async (req,res)=>{
    const chatId = req.params.id;
    try {
        const message = await Message.find({conversationId:`${chatId}`});
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:`Somthing went wrong ${error}`,
            error: true
        })
    }
}



module.exports = {newMessage,getMessage};