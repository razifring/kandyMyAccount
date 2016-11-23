var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./config/system/bootstrap')();

app.use('/scripts', express.static(__dirname + '/../node_modules/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

// let angular handle all other requests
app.use(function(req, res) {
   console.log('404 page:' + req.url);
    if (process.env.NODE_ENV === 'development') {
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    } else {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }
});

try {
    module.exports = app;
}
catch(e)
{
    console.log("Caught exception: %j, %s", e, e);
    logger.warn("Caught exception: %j, %s", e, e);
    logger.error("Caught exception: %j, %s", e, e);
    process.exit(1);
}