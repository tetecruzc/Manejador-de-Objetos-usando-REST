const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productRoutes  = require('./api/routes/routes');
app.use(bodyParser.json());



app.use('/api',productRoutes);
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
