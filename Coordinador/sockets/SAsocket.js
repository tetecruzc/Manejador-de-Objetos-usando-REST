const io = require("socket.io-client");
const actions = require("../actions/actions");
const socket = io("http://localhost:3000", {
  withCredentials: true
});

// Conexión con el servidor de aplicación
socket.on('successfullConnection', function(data) {
    console.log('Respuesta del servidor de aplicación', data.message);
})

socket.on('ReplicarObjetos', function(data) {
  console.log('REPLICAR OBJETO', data);
  actions.replicarObjetos(data)
})

socket.on('RestaurarObjetos', function(data) {
  console.log('RESTAURAR OBJETO', data);
})

exports.socket = socket; 