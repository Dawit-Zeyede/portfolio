const express = require('express');
const router = express.Router();
const { createJob, getJobs, getMatchingJobs } = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Protected route: Create a job listing
router.post('/jobs', verifyToken, checkRole(['employer']), createJob);

// Public route: Get all job listings
router.get('/jobs', getJobs);

// Route: Get matching jobs for a student
router.post('/jobs/match', verifyToken, getMatchingJobs);

module.exports = router;