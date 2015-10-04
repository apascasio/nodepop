"use strict";

var mongoose = require('mongoose');
var Messages =global.messages;

// definir esquema de usuario

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,

});


usuarioSchema.statics.getUser = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
  console.log(criterios);
    if(criterios!==null){
        var query = Usuario.findOne(criterios);

        query.exec( function(err, rows) {
            if (err) {
                return callback(err);
            }

            return callback(null, rows);

        });

    } else {return callback('usuario no verificado', Messages.dataNoFound); }



};



usuarioSchema.statics.addUser = function( usuario, callback) {

    console.log('aun no implementado');
    var usuario = {};

    usuario = {nombre: req.query.nombre, email: req.query.email, clave: req.query.clave};
    console.log(usuario);


};




// exportar

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
