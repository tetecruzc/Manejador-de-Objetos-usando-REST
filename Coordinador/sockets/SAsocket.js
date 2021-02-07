const io = require("socket.io-client");
const server= require("../server")
const actions = require("../actions/actions");
const socket = io("http://localhost:3000", {
  withCredentials: true
});

// Conexión con el servidor de aplicación
socket.on('successfullConnection', function(data) {
    console.log('Respuesta del servidor de aplicación', data.message);
})

socket.on('ReplicarObjetos', function(data) {
  server.replicarObjetos(data);
})

socket.on('RestaurarObjetos', function(data) {
  server.restaurarObjetos(data);
})

const restaurarObjetos = (objetos) =>{
  socket.emit('RESTAURACION', objetos)
}

exports.socket = socket; 
exports.restaurarObjetos= restaurarObjetos;