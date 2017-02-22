'use strict';

// Packages routes use packages controller
var packages = require('../controllers/packagesController');
var tokenManager = require('../lib/managers/tokenManager');
var apiCache = require('apicache');
const onlyStatus200 = req => req.statusCode === 200;

module.exports = function(app) {

    let cache = apiCache.middleware;

    app.get('/api/packages', tokenManager.hasAuthorization, cache('20 minutes', onlyStatus200), packages.getPurchasable);

    app.get('/api/packages/:msisdn', tokenManager.hasAuthorization, cache('10 minutes'), packages.getUserPackages);

    app.post('/api/packages/validate/', tokenManager.hasAuthorization, packages.validatePurchasePackage);

    app.post('/api/packages/inapp/', packages.inappPurchasePackage);

    app.post('/api/cards', tokenManager.hasAuthorization, packages.redeemCard)


};