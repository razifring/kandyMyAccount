'use strict';

// Packages routes use packages controller
var packages = require('../controllers/packagesController');
var tokenManager = require('../lib/managers/tokenManager');

module.exports = function(app) {

    app.get('/api/packages', tokenManager.hasAuthorization, packages.getPurchasable);

    app.get('/api/packages/:msisdn', tokenManager.hasAuthorization, packages.getUserPackages);

    app.post('/api/cards', tokenManager.hasAuthorization, packages.redeemCard)


};