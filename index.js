'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;


//Conexión a base de datos local
mongoose.connect('mongodb://localhost:27017/portfolio', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Conexión correcta con la base de datos");

        //Crear servidor
        app.listen(port, ()=>{
            console.log("Conexión correcta a servidor localhost:3700");
        });
    })
    .catch(err => console.log(err));