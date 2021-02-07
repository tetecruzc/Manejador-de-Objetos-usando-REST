const http = require('http');
const app = require('express')();
const port = process.env.PORT || 3003
const server = http.createServer(app);
server.listen(port);
const socket = require('./COconnection/socket');

exports.server = server;