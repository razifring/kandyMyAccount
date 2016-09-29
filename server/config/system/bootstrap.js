'use strict';

var fs = require('fs'),
    express = require('express'),
    appPath = process.cwd();

module.exports = function() {
/*
   function bootstrapDependencies() {
        // Register auth dependency
        mean.register('auth', function() {
            return require(appPath + '/server/routes/middlewares/authorization');
        });


        // Register app dependency
        mean.register('app', function() {
            return app;
        });
    }

    bootstrapDependencies();*/

    // Express settings
    var app = express();
    require('../express')(app);

    return app;
};
