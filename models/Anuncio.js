"use strict";

var mongoose = require('mongoose');

// definir esquema de anuncio

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]

});



// metodo estático que devuelve una lista de la BD
anuncioSchema.statics.lista = function( criterios,sort,start,limit, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios);

    query.sort('precio');

    //poner limites

    var limit = limit ;
    query.skip(start);

    query.limit(limit);

    //ejecutar query

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};


// exportar

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
