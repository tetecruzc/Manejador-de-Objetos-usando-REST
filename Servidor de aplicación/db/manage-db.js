var path = require("path");
var convert = require('xml-js');
const fs = require('fs');

const xml = fs.readFileSync(path.resolve(__dirname, "object.xml"), 'utf8');
const options = {ignoreComment: true, alwaysChildren: false, compact: true};

const getObjects = () => {
   return convert.xml2js(xml, options); 
}

const convertToXML = (objects) => {
    return convert.json2xml(objects,  {compact: true, ignoreComment: true, spaces: 4});
}

const saveFile = (object) => {
    fs.writeFileSync(path.resolve(__dirname, "object.xml"), object);
}

const searchLastID = (objects) =>{
    let max = 0;
    objects.forEach(element => {
        if (element.id._text > max) max = element.id._text; 
    });

    return max;
}

const transformObject = (object, id) =>{
    const transformatedObject = {
        "id": {
            "_text": id
        },
        "Fecha": {
            "_text": object.fecha
        },
        "Nombre": {
            "_text": object.nombre
        }
    }

    if (object.action) 
        transformatedObject["Action"] = {
            "_text": object.action
    }

    return transformatedObject;
}

// CRUDS

const searchAllObjects = () => {
    return getObjects();
}

const createObject = (obj) =>{
    const allObjects = getObjects();
    const id = parseInt(searchLastID(allObjects.Objetos.Objeto)) + 1
    const newObject = transformObject(obj, id);
    
    allObjects.Objetos.Objeto.push(newObject);

    const xmlObjects = convertToXML(allObjects);
    saveFile(xmlObjects)
}

const deleteObject = (id) => {
    const allObjects = getObjects();
    const index = allObjects.Objetos.Objeto.findIndex(object => object.id._text === id)
    allObjects.Objetos.Objeto.splice(index, 1);

    const xmlObjects = convertToXML(allObjects);
    saveFile(xmlObjects)
}

const replicateObjects = () => {
    return xml;
}


exports.searchAllObjects = searchAllObjects;
exports.createObject = createObject;
exports.deleteObject = deleteObject;
exports.replicateObjects = replicateObjects;