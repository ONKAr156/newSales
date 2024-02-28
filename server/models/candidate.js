const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    passingYear: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['pending', 'shortlisted', 'discarded', 'invited'],
        default: 'pending'
    },

}, { timestamps: true });

const Candidate = mongoose.model('candidates', candidateSchema);

module.exports = Candidate;