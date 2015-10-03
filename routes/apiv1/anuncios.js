"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Anuncio = mongoose.model('Anuncio'); //



// devuelve una lista de anuncios en JSON
router.get('/', function(req, res) {



    // sacar criterios de busqueda de query-string
    // ej. /apiv1/anuncios/?nombre=iphone
    var criterios = {};
    if (req.query.name) {
        criterios.name = req.query.name;
    }

    Anuncio.lista(criterios, function(err, lista) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: lista});

    });

});

// crea un anuncio
// POST /apiv1/anuncios
router.post('/', function(req, res, next) {

    var nuevo = req.body;

    // crear un registro de anuncio
    var anuncio = new Anuncio(nuevo);

    agente.save( function(err, creado) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        // devolver una confirmación
        res.json({ok:true, agente: creado});

    });

});




module.exports = router;