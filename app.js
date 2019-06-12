// Imports used
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import routes
const StatRoutes = require('./routes/StatRoutes');

//app
const app = express();

// connect to the database
mongoose.connect('mongodb+srv://waterlevelindicator:waterlevelindicator@waterlevelindicator-leo0c.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then(_=>{
        console.log("Connection established successfully!")
    })
    .catch(err=>{
        console.log("Something went wrong while connecting to the database, ",err)
    })

// use the morgan
app.use(morgan('dev'));

//use the body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// enable cross origin requests
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header(
        "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");    
        return res.status(200).json({});                                               
    }
    next(); 
});


// declare routes
app.use('/api/stats',StatRoutes);

// generate an error for route not found
app.use((req,res,next)=>{
    const error = new Error("Route Not Found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

// export app
module.exports = app;
