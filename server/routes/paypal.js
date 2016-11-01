'use strict';

var paypalController = require('../controllers/paypalController');

module.exports = function(app) {

    app.post('/api/paypal', paypalController.createPayment);

    app.post('/api/paypal/execute', paypalController.executePayment);
    app.get('/test', paypalController.test);

};