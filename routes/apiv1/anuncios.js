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

    // Filtro por nombre
    if (req.query.nombre ) {
        criterios.nombre = new RegExp('^'+ req.query.nombre, "i");
    }
    // Filtro por tipo de anuncio
    if (req.query.venta ) {
        criterios.venta = req.query.venta ;
    }
    // Filtro por tag
    if (req.query.tag ) {
        criterios.tags = req.query.tag;
    }

    // Filtro por precio mayor que
    if (req.query.precio ) {
        criterios.precio = {'$gte': req.query.precio};
    }
    // Filtro por precio menor que
    if (req.query.precio ) {
        criterios.precio = {'$lte': req.query.precio};
    }
    // Filtro por precio entre
    if (req.query.precio ) {
        criterios.precio = {'$gte': req.query.precio, '$lte': req.query.precio};
    }

    // Filtro por sort
    if (req.query.sort ) {
       var sort =  req.query.sort;
    }

    // poner límites
    var start = parseInt(req.query.start) || 0;
    // el Api devuelve como máximo 5 registros en cada llamada
    var limit = parseInt(req.query.limit) || 4;


    Anuncio.lista(criterios,sort,start,limit, function(err, lista) {
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
