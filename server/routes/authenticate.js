'use strict';

var auth = require('../controllers/authController');

module.exports = function(app) {

    app.post('/api/authenticate', auth.login);


};