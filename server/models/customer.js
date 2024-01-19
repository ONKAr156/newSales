const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    totalBought: {
        required: true,
        type: Number,
        default: 0,
    }
    // referal: {
    //     required: true,
    //     type: String
    // }
})

module.exports = mongoose.model('customer', customerSchema)