'use strict';

var stickerController = require('../controllers/stickerController');
var tokenManager = require('../lib/managers/tokenManager');
var apiCache = require('apicache');

module.exports = function(app) {
    let cache = apiCache.middleware;

    app.put('/api/stickers', tokenManager.hasAuthorization, stickerController.assignSticker);
    app.get('/api/authentication/uat/', tokenManager.hasAuthorization, cache('10 minutes'), stickerController.getStickerUAT);

};