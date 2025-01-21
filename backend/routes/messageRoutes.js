const express = require('express');
const { getChatHistory } = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Get chat history between two users
router.get('/messages/:userId', verifyToken, getChatHistory);

module.exports = router;