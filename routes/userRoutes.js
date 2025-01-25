const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.put('/user/profile', verifyToken, updateProfile);

module.exports = router;