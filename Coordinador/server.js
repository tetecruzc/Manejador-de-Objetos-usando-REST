const http = require('http');
const express = require("express");
const app = express();
const port = process.env.PORT || 3001
const server = http.createServer(app);
const io = require('socket.io')(server);
const actions = require('./replicas-actions/actions')

server.listen(port);

// Conexión con servidores de aplicacion
const SAsocket = require('./sockets/SAsocket');

// Conexión con servidores de replica
const SRsocket = io.on('connection', (socket) => {
  console.log(`Servidor de réplica conectado`);
  socket.emit('successfullConnection', { message: 'Conexión CO-SR exitosa' });

  socket.on('SR_VOTE', (data) => {
    // Evalua los votos de los servidores de replica
    actions.evaluateVotes(data)
  })

  socket.on('HACER_REPLICA', () => {
    // Envia los objetos a los servidores de replica
    emitMessageToReplicates('RECIBIR_OBJETOS',  actions.getObjects())
  })

  socket.on('OBJETOS_RESTAURADOS', (objects) =>{
    // Obtiene de los servidores de replica, los objetos restaurados
    SAsocket.restaurarObjetos(objects);
  })
});

const emitMessageToReplicates = (direction, data) => {
  SRsocket.emit(direction, data)
}

exports.emitMessageToReplicates=emitMessageToReplicates;





