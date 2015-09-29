"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//var Agente = require('../models/Anuncio'); // alternativa
var Anuncio = mongoose.model('Anuncio'); //

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// crea un agente, el mismo en cada post
router.post('/', function(req, res, next) {

    // crear un registro de anuncio
    var anuncio = new Anuncio({name:'Prueba', venta: false, precio: 10, foto:'http://localhost:3000/imagenes/anuncios/iphone4.jpg' ,tags: ['iphone','iphone 4']});

    anuncio.save( function(err, creado) {
        if (err) {
            console.log(err);
            return next(err);
        }

        console.log(creado);

    });

    res.send('respond with a resource');
});



module.exports = router;
