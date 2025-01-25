const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const studentId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        if (req.user.role !== 'student') {
            return res.status(403).json({ error: 'Only students can apply to jobs' });
        }

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

exports.getApplications = async (req, res) => {
    try {
        const employerId = req.user.id;

        if (req.user.role !== 'employer') {
            return res.status(403).json({ error: 'Only employers can view applications' });
        }

        const jobsPostedByEmployer = await Job.find({ employer: employerId }).select('_id');
        const jobIds = jobsPostedByEmployer.map(job => job._id);

        const applications = await JobApplication.find({ job: { $in: jobIds } })
            .populate('job', 'title')
            .populate('student', 'name email');

        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};