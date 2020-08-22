'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router =express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});



router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/saveProject', ProjectController.saveProject);
router.get('/project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/getImage/:image', ProjectController.getImageFile);


module.exports = router;