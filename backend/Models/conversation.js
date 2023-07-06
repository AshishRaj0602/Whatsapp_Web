const mongoose = require('mongoose');

const ConversationSchema =new mongoose.Schema(
    {
        members: Array,
    },
    {
        message: {
            type:String
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Conversation', ConversationSchema);

