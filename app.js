/**
 * Configuración express
 */

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Rutas
app.get('/test', (req, res)=>{
    res.status(200).send({
        message: "Ruta de test correcta"
    });
});

//Exportar
module.exports = app;

