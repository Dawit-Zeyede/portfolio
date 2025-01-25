const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getMatchingJobs,
    getJobById,
} = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

router.post('/jobs', verifyToken, checkRole(['employer']), createJob);

router.get('/jobs', getJobs);

router.post('/jobs/match', verifyToken, getMatchingJobs);

router.get('/jobs/:jobId', getJobById);

module.exports = router;