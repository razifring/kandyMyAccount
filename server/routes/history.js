'use strict';

var historyController = require('../controllers/hisotryController');

module.exports = function(app) {

    app.get('/api/history/:msisdn/:type/:start/:end', historyController.getHistory);


};