/**
 * Configuración express
 */

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var projects_routes = require('./routes/project'); 

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Rutas
app.use('/api', projects_routes);

//Exportar
module.exports = app;

