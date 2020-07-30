'use strict'

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
    }

};

module.exports = controller;