"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Usuario = mongoose.model('Usuario'); //





router.post('/', function(req, res) {
    var criterios = {};

    // Filtro por email
    if (req.query.email ) {
        criterios.email = req.query.email;
    }

    if (req.query.clave ) {
        criterios.clave = req.query.clave;
    }

    Usuario.getUser(criterios, function(err, lista) {

       console.log(lista);
        if (lista == null) {

            // devolver una confirmación
            res.json({ok: true, mensaje: 'usuario no autenticado'});
        }
        else {
            res.json({ok: false, mensaje: 'usuario autenticado'});
        }
    });








});


module.exports = router;
