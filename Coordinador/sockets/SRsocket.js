
const server = require('../server')
const io = require('socket.io')(server);


// Conexión con servidores de replica
const socket = io.on('connection', (socket) => {
  console.log(`Servidor de réplica conectado`);
  socket.emit('successfullConnection', { message: 'Conexión CO-SR exitosa' });
});

exports.socket = socket;