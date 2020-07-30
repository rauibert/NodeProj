'use strict'

var Project = require('../models/project');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Página Home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Página Test'
        });
    },

    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored)=>{
            if(err) return res.status(500).send({message: 'Error al guardar'});

            if(!projectStored) return res.status(404).send({message:'No se ha podido guardar'});

            return res.status(200).send({project: projectStored});
        });


        return res.status(200).send({
            project: project,
            message: 'Funciona'
        });
    }

};

module.exports = controller;