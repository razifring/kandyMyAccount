'use strict';

var stickerController = require('../controllers/stickerController');
var tokenManager = require('../lib/managers/tokenManager');

module.exports = function(app) {

    app.put('/api/stickers', tokenManager.hasAuthorization, stickerController.assignSticker);

};