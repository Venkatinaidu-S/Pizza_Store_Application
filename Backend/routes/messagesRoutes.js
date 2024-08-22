const express = require('express');
const { 
    sendMessageToUser
     } = require('../Controllers/messagesController');

const { protect,admin } = require('../middleware/authMiddleware');
const router = express.Router();


//routes
router.post('/sendmsg',protect,sendMessageToUser);// admin can send messages to user about order.

module.exports = router;
