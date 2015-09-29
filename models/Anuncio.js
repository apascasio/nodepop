"use strict";

var mongoose = require('mongoose');

// definir esquema de agente

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]

});






// exportar

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
