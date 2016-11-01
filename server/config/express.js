'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    consolidate = require('consolidate'),
    //flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config'),
    expressValidator = require('express-validator'),
    appPath = process.cwd(),
    fs = require('fs'),
    assetmanager = require('assetmanager'),
    compressions = require('compression'),
    logger = require('express-logger'),
    bodyParser = require('body-parser'),
    session = require('client-sessions'),
    cookieParser = require('cookie-parser');

module.exports = function(app) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;

    // cache=memory or swig dies in NODE_ENV=production
    app.locals.cache = 'memory';

    process.env.JWT_SECRET_KEY = config.jwsSecret;

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compressions({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(logger({path: config.root + '/server/logs/debug.log'}));
    }

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');

    // Set views path, template engine and default layout
    app.set('views', config.root + '/server/views');

    // Enable jsonp
    app.enable('jsonp callback');

    function bootstrapRoutes() {
        var routes_path = appPath + '/server/routes';
        var walk = function(path) {
            fs.readdirSync(path).forEach(function(file) {
                var newPath = path + '/' + file;
                var stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    if (/(.*)\.(js$|coffee$)/.test(file)) {
                        require(newPath)(app);
                    }
                    // We skip the app/routes/middlewares directory as it is meant to be
                    // used and shared by routes as further middlewares and is not a
                    // route by itself
                } else if (stat.isDirectory() && file !== 'middlewares') {
                    walk(newPath);
                }
            });
        };
        walk(routes_path);
    }


    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride;
    app.use(bodyParser.json());
    app.use(bodyParser.raw());

    app.use(expressValidator());

    // Import your asset file
    var assets = assetmanager.process({
        assets: require('./assets.json'),
        debug: (process.env.NODE_ENV !== 'production'),
        webroot: 'public'
    });

    // Add assets to local variables
    app.use(function (req, res, next) {
        res.locals({
            assets: assets
        });
        next();
    });

     // Express session storage
     app.use(session({
         cookieName: 'session',
         secret: 'mBQ5lHgfz-ACjJdM6olLs2',
         duration: 30 * 60 * 1000,
         activeDuration: 5 * 60 * 1000,
         cookie:{
             httpOnly: false
         }
         })
     );

    app.use(session({
            cookieName: 'userSession',
            secret: 'mBQ5lHgfz-ACjJdM6olLs2',
            duration: 30 * 60 * 1000,
            activeDuration: 5 * 60 * 1000,
            cookie:{
                httpOnly: false
            }
        })
    );

    app.use(function(req, res, next) {
        if (req.userSession && req.userSession.user) {
            req.userId =  req.userSession.user.userId;
            next();
        } else {
            next();
        }
    });

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Connect flash for flash messages
    //app.use(flash());

    // Setting the fav icon and static folder
    //app.use(express.favicon());
    app.use('/public', express.static(config.root + '/public'));

    bootstrapRoutes();

};