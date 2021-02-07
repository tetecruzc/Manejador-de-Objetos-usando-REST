const http = require('http');
const express = require("express");
const app = express();
const port = process.env.PORT || 3001
const server = http.createServer(app);
const io = require('socket.io')(server);
let servidoresDeReplica = 0;
let votes = [];
let allObjects;
server.listen(port);

// Conexión con servidores de aplicacion
const SAsocket = require('./sockets/SAsocket');

// Conexión con servidores de replica
const SRsocket = io.on('connection', (socket) => {
  servidoresDeReplica++;
  console.log(`Servidor de réplica conectado`);
  socket.emit('successfullConnection', { message: 'Conexión CO-SR exitosa' });
  socket.on('SR_VOTE', (data) => {
    evaluateVotes(data)
  })
  socket.on('HACER_REPLICA', (data) => {
    // Envia los objetos a los servidores de replica
    SRsocket.emit('RECIBIR_OBJETOS', allObjects);
  })

  socket.on('OBJETOS_RESTAURADOS', (objects) =>{
    SAsocket.restaurarObjetos(objects);
  })
});

SRsocket.on('disconnect', function() { servidoresDeReplica--; });


const restaurarObjetos = (server) =>{
  SRsocket.emit(server)
}

const replicarObjetos = (objects) =>{
  allObjects = objects.content;
  SRsocket.emit('VOTE_REQUEST', objects.action)
}


const evaluateVotes  = (vote) => {
  votes.push(vote);
  if (votes.length  == 2) {
    const action = vote.includes('VOTE_ABORT') ? 'GLOBAL_ABORT' : 'GLOBAL_COMMIT';
    SRsocket.emit('GLOBAL_VOTE', action)
    votes = [];
  }
}


exports.SRsocket = SRsocket;
exports.replicarObjetos = replicarObjetos;
exports.restaurarObjetos = restaurarObjetos;





