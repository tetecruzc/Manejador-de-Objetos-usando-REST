const app = require('express')();
const port = process.env.PORT || 3001
var server = require('http').Server(app);
server.listen(port);

const SAsocket = require('./sockets/SAsocket');
const SRsocket = require('./sockets/SRsocket');
exports.server = server;





