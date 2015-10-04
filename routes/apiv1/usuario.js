"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Usuario = mongoose.model('Usuario'); //
var languages = global.config.application.languages;
//var Messages = require('../../languages/' + 'en');
var Messages =global.messages;





router.get('/:lang(' + languages + ')', function(req, res, next) {

   global.i18n.setLanguage(req.params.lang, function(req, res){

         Messages = global.lang;
        console.log(Messages);
    });
    //global.i18n.setLanguage(req.params.lang);


    //console.log(global.i18n.setLanguage(req.params.lang);


    var token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'];

    if(token){
        jwt.verify(token,config.jwt.secret, function(err, decode){
            if(err){
                return res.status(401).json({ok:false, error: Messages.TOKEN_01});
            }
            //el usuario esta autenticado y puede seguir
            next();
        });
    }else{
        return res.status(401).json({ok:false, error: Messages.TOKEN_00});


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


router.post('/:lang(' + languages + ')', function(req, res) {

    global.i18n.setLanguage(req.params.lang, function(req, res){

        Messages = global.lang;

    });



    var criterios = {};

    // Filtro por email
    if (req.query.email) {
        criterios.email = req.query.email;
    }
    if (req.query.nombre !== null || req.query.email !== null|| !req.query.clave ) {

        var usuario = {};
        usuario = {nombre: req.query.nombre, email: req.query.email, clave: req.query.clave};


        Usuario.getUser(criterios, function (err, lista) {


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
            else {
                res.json({ok: false, mensaje: Messages.userAlreadyExists});
            }
        });

    }
    else {


            if (req.query.nombre == null) {
                res.json({ok: false, mensaje: Messages.nameRequired})
            }
            if (req.query.email == null) {
                res.json({ok: false, mensaje: Messages.emailRequired})
            }
            if (req.query.clave == null) {
                res.json({ok: false, mensaje: Messages.passwordRequired})
            }






}


});




module.exports = router;