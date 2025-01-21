const Job = require('../models/Job');

// Create a new job listing
exports.createJob = async (req, res) => {
    try {
        const { title, description, skills, location } = req.body;
        const employerId = req.user.id;  // Get employer ID from JWT token

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

// Get all job listings
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'name email');  // Include employer details
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get matching jobs for student based on title, skills, and location
exports.getMatchingJobsForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;  // Student ID from URL parameter

        // Find student by ID (assuming you have a Student model)
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { title, skills, location } = student;  // Get student's title, skills, and location

        // Find jobs where the title, skills, and location match
        const matchingJobs = await Job.find({
            title: { $in: [title] },  // Match student title to job title
            skills: { $in: skills },  // Match student skills to required skills
            location: location,  // Match student location to job location
        }).populate('employer', 'name email');  // Populate employer details

        // If no matching jobs found
        if (matchingJobs.length === 0) {
            return res.status(404).json({ message: 'No matching jobs found' });
        }

        // Return the matching jobs
        res.status(200).json({ matchingJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get matching jobs based on skills
exports.getMatchingJobs = async (req, res) => {
    try {
        const { skills, title, location } = req.body;  // Skills, title, and location provided by the student

        if (!skills || skills.length === 0) {
            return res.status(400).json({ error: 'No skills provided' });
        }

        // Build a query object based on available inputs (title, skills, location)
        const query = {};

        // Only add title to query if provided
        if (title) {
            query.title = { $in: [title] };  // Match title with job's title
        }

        // Only add skills to query if provided
        if (skills && skills.length > 0) {
            query.skills = { $in: skills };  // Match skills with required skills
        }

        // Only add location to query if provided
        if (location) {
            query.location = location;  // Match location with job's location
        }

        // Find matching jobs
        const matchingJobs = await Job.find(query).populate('employer', 'name email');  // Include employer details

        // If no matching jobs found
        if (matchingJobs.length === 0) {
            return res.status(404).json({ message: 'No matching jobs found' });
        }

        // Return the matching jobs
        res.status(200).json({ matchingJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};