const express = require("express");
const app = express();
const productRoutes  = require('./api/routes/test');

app.use('/tests',productRoutes);
app.use((req,res,next)=>{
    const error = new Error("Not found Error");
    error.status = 404;
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;
