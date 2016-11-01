'use strict';

var auth = require('../controllers/authController');

module.exports = function(app) {

    app.post('/api/auth/login', auth.login);
    app.post('/api/auth/autologin', auth.autologin);
};