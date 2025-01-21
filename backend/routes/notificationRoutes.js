const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Send notification (could be for a specific user or event)
router.post('/send', notificationController.sendUserNotification);

module.exports = router;