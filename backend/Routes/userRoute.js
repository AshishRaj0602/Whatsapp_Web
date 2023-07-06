const express = require('express');
const {register,login,findUser, getAllUsers} = require('../Controllers/userController');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/find/:id',findUser);
router.get('/',getAllUsers);
module.exports = router