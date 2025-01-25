const express = require('express');
const { getChatHistory, sendMessage } = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/messages/:userId', verifyToken, getChatHistory);

router.post('/send-message/:studentId', verifyToken, sendMessage);

module.exports = router;