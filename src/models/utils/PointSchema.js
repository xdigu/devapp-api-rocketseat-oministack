'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number]
    }
});
