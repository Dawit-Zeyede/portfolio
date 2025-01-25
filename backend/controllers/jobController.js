const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { title, description, skills, location } = req.body;
        const employerId = req.user.id;
        const job = new Job({
            title,
            description,
            skills,
            location,
            employer: employerId,
        });

        await job.save();
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'name email');
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMatchingJobsForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { title, skills, location } = student;

        const matchingJobs = await Job.find({
            title: { $in: [title] },
            skills: { $in: skills },
            location: location,
        }).populate('employer', 'name email');

        if (matchingJobs.length === 0) {
            return res.status(404).json({ message: 'No matching jobs found' });
        }

        res.status(200).json({ matchingJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getMatchingJobs = async (req, res) => {
    try {
        const { skills, title, location } = req.body;

        if (!skills || skills.length === 0) {
            return res.status(400).json({ error: 'No skills provided' });
        }

        const query = {};

        if (title) {
            query.title = { $in: [title] };
        }

        if (skills && skills.length > 0) {
            query.skills = { $in: skills };
        }

        if (location) {
            query.location = location;
        }

        const matchingJobs = await Job.find(query).populate('employer', 'name email');  // Include employer details

        if (matchingJobs.length === 0) {
            return res.status(404).json({ message: 'No matching jobs found' });
        }

        res.status(200).json({ matchingJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJobById = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId).populate('employer', 'name email');
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ job });
    } catch (error) {
        console.error('Error fetching job:', error.message);
        res.status(500).json({ error: error.message });
    }
};