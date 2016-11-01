'use strict';

// Packages routes use packages controller
var packages = require('../controllers/packagesController');
var tokenManager = require('../lib/managers/tokenManager');
//var authorization = require('./middlewares/authorization');
/*
// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};*/

module.exports = function(app) {

    app.get('/api/packages', tokenManager.hasAuthorization, packages.getPurchasable);

    app.get('/api/packages/:msisdn', tokenManager.hasAuthorization, packages.getUserPackages);

    app.post('/api/cards', tokenManager.hasAuthorization, packages.redeemCard)


};