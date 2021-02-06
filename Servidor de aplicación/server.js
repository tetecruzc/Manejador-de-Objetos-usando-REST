const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(port);

const socketIO = io.on('connection', (socket) => {
    console.log('El coordinador se ha conectado')
    socket.emit('successfullConnection', { message: 'Conexión SA-CO exitosa' });
});

const replicarObjetos = (objetos, action) => {
    socketIO.emit('ReplicarObjetos', {'content': objetos, action})
}

const restaurarObjetos = (objetos, action) => {
    socketIO.emit('RestaurarObjetos', {'content': objetos, action})
}

exports.replicarObjecto = replicarObjetos;
exports.socketIO = socketIO;
