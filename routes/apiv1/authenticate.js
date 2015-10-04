"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Usuario = mongoose.model('Usuario');
var jwt = require('jsonwebtoken');
var config  = require('../../config/config');





router.post('/', function(req, res) {
    var criterios = {};

    // Filtro por email
    if (req.query.email ) {
        criterios.email = req.query.email;
    }

    if (req.query.clave ) {
        criterios.clave = req.query.clave;
    }

    Usuario.getUser(criterios, function(err, user) {

       console.log(user);
        if (user == null) {

            // devolver una confirmación
            res.json({ok: false, mensaje: 'usuario no autenticado'});
        }
        else {
            // creamos un token
           var token = jwt.sign(user, config.jwt.secret, {
                expiresInMinutes: config.jwt.expiresInMinutes
            });

           // var token = 'jajfljlauf';


            res.json({ok: true, token: token});
        }
    });








});


module.exports = router;
