'use strict'

const mongoose = require('mongoose');
const { config } = require('dotenv');

config();

const dbConfig = process.env.MONGO_CONNECTION_STRING;

module.exports = {
    dbConnect: () => {
        mongoose.connect(
            dbConfig, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }
}
