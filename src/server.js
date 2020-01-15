'use strict'

const express = require('express');
const routes = require('./routes');
const morganLoger = require('morgan');

const db = require('./config/mongoConnection');


class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.dbConnection();
    }

    middleware() {
        this.express.use(express.json());
        this.express.use(morganLoger("dev"));
    }

    routes() {
        this.express.use(routes);
    }

    dbConnection() {
        db.dbConnect();
    }
}

module.exports = new App().express;
