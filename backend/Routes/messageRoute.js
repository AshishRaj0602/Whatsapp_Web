const express= require('express');
const router= express.Router();
const {newMessage,getMessage}=require('../Controllers/messageController');
const upload = require('../middleware/upload');
const { uploadImage, getImage } = require('../Controllers/imageController');

router.post('/message/add',newMessage);
router.get('/message/get/:id',getMessage);
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);

module.exports = router;

