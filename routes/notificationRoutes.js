const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/send', notificationController.sendUserNotification);

module.exports = router;