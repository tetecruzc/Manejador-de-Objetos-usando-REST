const http = require('http');
const app = require('./app')
const db = require('./db/manage-db')
const port = process.env.PORT || 3000
const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(port);

const socketIO = io.on('connection', (socket) => {
    console.log('El coordinador se ha conectado')
    socket.emit('successfullConnection', { message: 'Conexión SA-CO exitosa' });
    socket.on('RESTAURACION', (objects) =>{
        db.saveFile(objects)
    })
});

const replicarObjetos = (objetos, action) => {
    console.log('Ha empezado la REPLICA DE OBJETOS')
    socketIO.emit('ReplicarObjetos', {'content': objetos, action})
}

const restaurarObjetos = (server) => {
    console.log('Ha empezado la RESTAURACIÓN DE OBJETOS')
    socketIO.emit('RestaurarObjetos', server);
}

exports.replicarObjetos = replicarObjetos;
exports.restaurarObjetos = restaurarObjetos;
exports.socketIO = socketIO;
