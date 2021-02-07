var path = require("path");
const fs = require('fs');


const saveFile = (object) => {
    fs.writeFileSync(path.resolve(__dirname, "object.xml"), object);
}

const getObjectsToBeRestored = () => {
    return fs.readFileSync(path.resolve(__dirname, "object.xml"), 'utf-8');;
}


exports.getObjectsToBeRestored = getObjectsToBeRestored;
exports.saveFile = saveFile;