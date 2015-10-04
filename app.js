var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var dbMongo = require('./lib/dbMongo.js'); // no es necesario asignarlo a nada
require('./models/Anuncio.js');
require('./models/Usuario.js');



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//internacionalizacion
/*require('./system/prototype');
global.config = require('./config/config');
global.i18n = require('./system/helpers/i18n');
global.messages = require('./languages/es' );*/

//global.i18n.setLanguage();
require('./system/prototype');
global.config = require('./config/config');
global.i18n = require('./system/helpers/i18n');
global.messages = require('./languages/es' );




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){

  //console.log(req.get('User-Agent'));
  var esAndroid = req.get('User-Agent').match(/Android/i);
  req.Android = esAndroid;
  console.log(req.Android);

  var esIphone = req.get('User-Agent').match(/Iphone/i);
  req.Iphone = esIphone;
  console.log(req.Iphone);

  next();



});

app.use('/', routes);
app.use('/users', users);
app.use('/anuncios', require('./routes/anuncios'));


// API Version 1

app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuario', require('./routes/apiv1/usuario'));
app.use('/usuario/authenticate',require('./routes/apiv1/authenticate'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
