const SRsocket = require('./../sockets/SRsocket');

const replicarObjetos = (objects) =>{
    SRsocket.emit('ReplicarObjetos', objects)
}

exports.replicarObjetos = replicarObjetos;