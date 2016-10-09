'use strict';

var auth = require('../controllers/auth');

module.exports = function(app) {

    app.post('/api/authenticate', auth.login);


};