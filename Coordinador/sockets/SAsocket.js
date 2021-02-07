// ----------- SOCKET CLIENTE PARA EL SERVIDOR DE APLICACIÓN
const io = require("socket.io-client");
const actions = require("../replicas-actions/actions");
const socket = io("http://localhost:3000", {
  withCredentials: true
});

socket.on('successfullConnection', function(data) {
    console.log(data.message);
})

socket.on('ReplicarObjetos', function(data) {
  console.log('Ha empezado la REPLICA DE OBJETOS')
  actions.replicarObjetos(data);
})

socket.on('RestaurarObjetos', function(data) {
  console.log('Ha empezado la RESTAURACIÓN DE OBJETOS')
  actions.restaurarObjetos(data);
})

const restaurarObjetos = (objetos) =>{
  //Envía objetos restaurados al servidor de aplicación
  socket.emit('RESTAURACION', objetos)
}

exports.socket = socket; 
exports.restaurarObjetos= restaurarObjetos;