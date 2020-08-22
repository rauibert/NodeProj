'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/project');

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
    },

    getProject: function(req, res){
        var projectId = req.params.id;

        Project.findById(projectId, (err, project) =>{
            if(err) return res.status(500).send({message: 'Error al recibir datos'});

            if(!project) return res.status(404).send({message: 'El proyecto no existe'});

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){
        
        Project.find({},(err,projects) =>{

            if(err) return res.status(500).send({message: 'Error al devolver datos'});

            if(!projects) return res.status(404).send({message: 'No existen proyectos'});

            return res.status(200).send({
                projects
            });
        });  
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: 'error al actualizar datos'});

            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto'});

            return res.status(200).send({
                project: projectUpdated 
            });
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({message: 'No han podido borrarse los datos'});

            if(!projectRemoved) return res.status(404).send({message: 'No puede borrarse el proyecto'});

            return res.status(200).send({
                project: projectRemoved 
            });
        });
    },

    uploadImage: function(req, res){

        var projectId = req.params.id;
        var filename = "Imagen no subida...";

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true} ,(err, projectUpdated) =>{
                    if(err) return res.status(500).send({message: 'Error al subir imagen'});
    
                    if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto'});
        
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            }else{

                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: 'La extensión no es válida'});
                });

            }
            

            
        }else{
            return res.status(200).send({
                message: filename
            });
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var pathFile = './uploads/'+ file;

        fs.exists(pathFile, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen"
                });
            }
        });


    }

};

module.exports = controller;