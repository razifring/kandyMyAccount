'use strict';

var historyController = require('../controllers/hisotryController');
var tokenManager = require('../lib/managers/tokenManager');

module.exports = function(app) {

    app.get('/api/history/:msisdn/:type/:start/:end', tokenManager.hasAuthorization, historyController.getHistory);


};