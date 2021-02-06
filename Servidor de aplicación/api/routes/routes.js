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
    if (!req.params.id) res.status(404).json({message: 'ID requerido'})
  
    db.deleteObject(req.params.id)
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
    res.status(200).json({
        message: 'Replicación en proceso'
    })
})



module.exports = router;