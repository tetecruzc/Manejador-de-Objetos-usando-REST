const express = require("express");
const router =  express.Router()

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Otra vez en Node. /test'
    })
})


router.post('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Otra vez en Node. /test'
    })
})


router.get('/:testId', (req,res,next)=>{
    const id = req.params.productId;

    res.status(200).json({
        message: 'THE TEST :',
        id: id
    })
})

module.exports = router;