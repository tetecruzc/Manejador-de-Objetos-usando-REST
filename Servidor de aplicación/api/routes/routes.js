const express = require("express");
const router =  express.Router()
const server = require('../../server')
const db = require('../../db/manage-db')


router.get('/consultar', (req,res,next)=>{
    const result = db.searchAllObjects();
    res.status(200).json(result)
})

router.post('/crear', (req,res,next)=>{
    const {fecha, nombre, accion} = req.body;
    if (!fecha || !nombre) res.status(404).json({message: 'Datos erróneos'})

    db.createObject(req.body)
    res.status(201).json({
        message: 'Objeto creado satisfactoriamente'
    })
})

router.delete('/eliminar/:id', (req,res,next)=>{
    const { id } = req.params;

    if (!id) return res.status(404).json({message: 'ID requerido'})
    if (!db.validateExistence(id))  return res.status(404).json({message: `El objecto ID = ${id} no existe`})
    
    db.deleteObject(id)
    res.status(204).json({
        message: 'Objeto eliminado satisfactoriamente'
    })
})

router.post('/replicar', (req,res,next)=>{
    // 1) Verifica contenido del body
    if (!req.body.accion) res.status(404).json({message: 'Accion es requerida'})
    // 2) Obtener objetos de la base de datos en XML
    objects = db.replicateObjects()
    // 3) Replicar objeto en el coordinador de replicas
    server.replicarObjetos(objects, req.body.accion);
    // 4) Respuesta al cliente
    const message = req.body.accion == 'COMMIT' ? 'Replicación realizada' : 'Replicación abortada'
    res.status(200).json({
        message,
    })
})

router.post('/restaurar', (req,res,next)=>{
    if (!req.body.server) res.status(404).json({message: 'Debe incluir el servidor'});
    
    server.restaurarObjetos(req.body.server)
    res.status(200).json({message: 'Respaldo realizado' })
})

module.exports = router;