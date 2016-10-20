'use strict';

var auth = require('../controllers/authController');

module.exports = function(app) {

    app.post('/api/otp', auth.sendOtp);


};