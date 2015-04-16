var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var reload = require('require-reload')(require);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
*/

var baseLama

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var base = req.path.split('/')[1]
    var dirAset = 'public/' + base

    if(baseLama !== base) {
        for (var key in Object.keys(require.cache)) {delete require.cache[key]}
        baseLama = base
    }

    if(path.extname(req.path)) {
        fs.readFile('public' + req.path, 'utf8', function(error, data) {
            if (error) {
                console.warn('Tidak bisa membaca berkas tujuan.')
                tampilError(err, res)
            } else {
                res.send(data)
            }
        })
        return
    }

    var muatan = './' + dirAset + '/app'
    console.log('memuat: ' + muatan)
    try {
        reload(muatan)(err, req, res)
    } catch(e) {
        console.warn('Modul tidak ada atau ada kesalahan program.')
    }

    if (err.status) {
        if (err.status == 404) {
            fs.readFile(dirAset + '/index.htm', 'utf8', function(error, data) {
                if (error) {
                    fs.readFile(dirAset + '/index.html', 'utf8', function(error, data) {
                        if (error) {
                            console.warn('Tidak bisa membaca berkas index.')
                            tampilError(err, res)
                        } else {
                            res.send(data)
                        }
                    })
                } else {
                    res.send(data)
                }
            })
        } else {
            tampilError(err, res)
        }
    }
});

function tampilError(err, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
}


module.exports = app;
