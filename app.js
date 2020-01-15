'use strict'

const { Server: httpServer } = require('http');
const server = require('./src/server');

const app = httpServer(server);
const port = process.env.PORT || 3003

app.listen(port, () => {
    console.log('App listening on %s', port);
});
