const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');

// Student applies to a job
exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const studentId = req.user.id;

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        // Check if the user is a student
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: 'Only students can apply to jobs' });
        }

        // Prevent duplicate applications
        const existingApplication = await JobApplication.findOne({ job: jobId, student: studentId });
        if (existingApplication) {
            return res.status(400).json({ error: 'You have already applied to this job' });
        }

        const application = new JobApplication({ job: jobId, student: studentId });
        await application.save();

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Employer views applications for their jobs
exports.getApplications = async (req, res) => {
    try {
        const employerId = req.user.id;

        // Check if the user is an employer
        if (req.user.role !== 'employer') {
            return res.status(403).json({ error: 'Only employers can view applications' });
        }

        const applications = await JobApplication.find()
            .populate('job', 'title')
            .populate('student', 'name email');

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};