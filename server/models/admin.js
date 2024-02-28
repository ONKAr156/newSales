const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileCreationDate: {
        type: String,
        required: true
    },
    sale: {
        type: Number
    },
    id: {
        type: Number,
        required: true,
    },
    adminId: {
        type: String,
        required: true,
    },
    OTP: {
        type: Number,
    },
    otpCreatedAt: {
        type: Date,
        default: null,
    }

})

module.exports = mongoose.model('admin', adminSchema);