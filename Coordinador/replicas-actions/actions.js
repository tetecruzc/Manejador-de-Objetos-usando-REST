const SRsocket = require('../server');
let votes = [];
let allObjects;

// Acciones para llevar a cabo con los servidores de replicas
const restaurarObjetos = (server) =>{
    SRsocket.emitMessageToReplicates(server, null)
}
  
const replicarObjetos = (objects) =>{
    allObjects = objects.content;
    SRsocket.emitMessageToReplicates('VOTE_REQUEST', objects.action)
}
  
const evaluateVotes  = (vote) => {
    votes.push(vote);
    if (votes.length  == 2) {
        const action = vote.includes('VOTE_ABORT') ? 'GLOBAL_ABORT' : 'GLOBAL_COMMIT';
        SRsocket.emitMessageToReplicates('GLOBAL_VOTE', action)
        votes = [];
    }
}

const getObjects = () => {
    return allObjects;
}
  
exports.restaurarObjetos=restaurarObjetos;
exports.replicarObjetos =replicarObjetos;
exports.evaluateVotes =evaluateVotes;
exports.getObjects = getObjects;