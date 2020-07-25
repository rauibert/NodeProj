'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//Conexión a base de datos local
mongoose.connect('mongodb://localhost:27017/portfolio', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Conexión correcta con la base de datos")
    })
    .catch(err => console.log(err));