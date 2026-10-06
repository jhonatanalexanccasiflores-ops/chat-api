const express = require('express');

const router = express.Router();

const {
    createMessage,
    getMessagesByChat
} = require('../controllers/messageController');
router.post('/', createMessage);
router.get('/chat/:chatId', getMessagesByChat);


module.exports = router;