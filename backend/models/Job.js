const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],  // List of required skills
    location: { type: String, required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the employer
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);