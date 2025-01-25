const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['applied', 'reviewed', 'rejected', 'accepted'], default: 'applied' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);