'use strict';

// Packages routes use packages controller
var packages = require('../controllers/packagesController');
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

    app.get('/api/packages', packages.getPurchasable);

    app.get('/api/packages/:msisdn', packages.getUserPackages);

    app.post('/api/cards', packages.redeemCard)


};