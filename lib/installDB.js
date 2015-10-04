

'use strict';



require('./dbMongo');

var mongoose = require('mongoose');

var readLine = require('readline');

var async = require('async');
var Usuario = require('../models/Usuario.js');



//db.once('open', function() {

function initDB() {



    var rl = readLine.createInterface({

        input: process.stdin,

        output: process.stdout

    });



    rl.question('Are you sure you want to empty DB? (no) ', function (answer) {

        rl.close();

        if (answer.toLowerCase() === 'yes') {

            //console.log('ejecuto acciones');

            //runInstallScript();
            initUsuarios();
            initAnuncios();

        } else {

            console.log('DB install aborted!');

            return process.exit(0);

        }

    });



//});



}



function runInstallScript() {

    async.series([
        initUsuarios,
        initAnuncios
    ], (err, results) => {
        if (err) {
        console.error('Hubo un error: ', err);
        return process.exit(1);
    }
    return process.exit(0);
}
);
}

function initAnuncios(cb) {

    var Anuncio = require('../models/Anuncio');


    // elimino todos
    Anuncio.remove({}, ()=> {

        // aqui cargaríamos el json de anuncios (readFile, JSON.parse, iterar con Anuncio.save...)

        var fs = require('fs');
        var path = require('path');
        //Open a file
        var file = path.join('.', '/lib/anuncios.txt'); //Join as ./test.txt


    fs.readFile(file, {encoding:'utf8'}, function(err, data){
        if (err) {
            console.log(err);
            return;
        }

        var obj = JSON.parse(data);

        for(var i = 0; i < obj.length; i++) {
            var newAnuncio = new Anuncio();
            newAnuncio.nombre = obj[i].nombre;
            newAnuncio.venta = obj[i].venta;
            newAnuncio.precio = obj[i].precio;
            newAnuncio.foto = obj[i].foto;
            newAnuncio.tags = obj[i].tags;

            newAnuncio.save( function(err, creado) {
                if (err) {
                    console.log(err);
                    return next(err);
                }


            });

            console.log(i);






        }







    });

        ///
    console.log('anuncios guardados con exito')

    });

}

function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

    // elimino todos
    Usuario.remove({}, ()=> {

        // aqui cargaríamos al menos un usuario (Usuario.save)

        var usuario =  new Usuario({nombre:'admin', email:'admin@nodepop.com',clave:'test123'});
    console.log(usuario);
        usuario.save( function(err, creado) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        // devolver una confirmación
        console.log(creado);

    });



});
}






initDB();

