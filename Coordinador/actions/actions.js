const SRsocket = require('./../server');
const votes = 0;

const replicarObjetos = (objects) =>{
    SRsocket.emit('VOTE_REQUEST', {data: 'VOTE_REQUEST'})
}


const addVote  = (vote) => {
    if (vote === 'VOTE_COMMIT')
        votes = votes+1;
}


exports.replicarObjetos = replicarObjetos;