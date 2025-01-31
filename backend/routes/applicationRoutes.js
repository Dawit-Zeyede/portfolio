const express = require('express');
const router = express.Router();
const { applyToJob, getApplications } = require('../controllers/applicationController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

router.post('/applications/:jobId', verifyToken, checkRole(['student']), applyToJob);

router.get('/applications', verifyToken, checkRole(['employer']), getApplications);

module.exports = router;