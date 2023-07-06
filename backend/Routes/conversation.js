const express= require('express');
const {newConversation,getConversation}=require('../Controllers/conversationController');
const {newMessage} =require('../Controllers/messageController');

const router= express.Router();


router.post('/conversation/add',newConversation);
router.post('/conversation/get',getConversation);
router.post('/message/add',newMessage);

module.exports = router;