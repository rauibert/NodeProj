'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router =express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/saveProject', ProjectController.saveProject);
router.get('/project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);


module.exports = router;