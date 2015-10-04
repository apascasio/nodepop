"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Usuario = mongoose.model('Usuario'); //


router.get('/', function(req, res, next) {
    var token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'];

    if(token){
        jwt.verify(token,config.jwt.secret, function(err, decode){
            if(err){
                return res.status(401).json({ok:false, error: 'Token no valido'});
            }
            //el usuario esta autenticado y puede seguir
            next();
        });
    }else{
        return res.status(401).json({ok:false, error: 'Token requerido'});


    }



});

// devuelve una lista de anuncios en JSON
router.get('/', function(req, res) {


    // sacar criterios de busqueda de query-string
    // ej. /apiv1/usuarios/?usuario=juan
    var criterios = {};

    // Filtro por email
    if (req.query.email ) {
        criterios.email = req.query.email;
    }



    Usuario.getUser(criterios, function(err, lista) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: lista});

    });

});


router.post('/', function(req, res) {
    var criterios = {};

    // Filtro por email
    if (req.query.email ) {
        criterios.email = req.query.email;
    }
    var usuario = {};

    usuario = {nombre: req.query.nombre, email: req.query.email, clave: req.query.clave};

    Usuario.getUser(criterios, function(err, lista) {


        if (lista == null) {
            var newusuario = new Usuario(usuario);

            newusuario.save(function (err, data) {
                if (err) {
                    return callback(err);
                }
                // devolver una confirmación
                res.json({ok: true, mensaje: data});
            });

        }
        else { res.json({ok: false, mensaje: 'usuario ya existe'}); }





    });


});




module.exports = router;