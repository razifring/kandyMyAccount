'use strict';

var paypalController = require('../controllers/paypalController');
var tokenManager = require('../lib/managers/tokenManager');

module.exports = function(app) {

    app.post('/api/paypal', tokenManager.hasAuthorization, paypalController.createPayment);
    app.post('/api/paypal/execute', tokenManager.hasAuthorization, paypalController.executePayment);

};