const io = require("socket.io-client");
const db = require('../db/manage-db');
const socket = io("http://localhost:3001", {
  withCredentials: true
});

// Conexión con el servidor de aplicación
socket.on('successfullConnection', function(data) {
    console.log('Respuesta del coordinador', data);
})

socket.on('VOTE_REQUEST', function(action) {
  const vote = action === 'COMMIT' ? 'VOTE_COMMIT' : 'VOTE_ABORT'
  socket.emit('SR_VOTE', vote)
})

socket.on('GLOBAL_VOTE', function(data) {
  if (data === 'GLOBAL_COMMIT'){
    socket.emit('HACER_REPLICA', 'HACER_REPLICA')
  }
  
})

socket.on('RECIBIR_OBJETOS', function(objects) {
  db.saveFile(objects)
})


socket.on('RESTAURAR-A', function() {
  const objects =  db.getObjectsToBeRestored();
  socket.emit('OBJETOS_RESTAURADOS', objects)
})

exports.socket = socket; 