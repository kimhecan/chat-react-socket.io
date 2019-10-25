const express = require('express');
const webSocket = require('./socket');

const app = express();

const server = app.listen(8081, () => {
    console.log('server is running on localhost: 8081');
});

webSocket(server);
