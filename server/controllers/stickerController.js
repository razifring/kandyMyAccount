
'use strict';
var stickerManager = require('../lib/managers/stickerManager');
var config = require('../config/config');
var responseDataObject = require('../lib/dataObjects/responseDataObject');

/**
 * Paypal integration
 */
var token ='';

/**
 * Create a payment flow in paypal and return a redirect link for the user to go to paypal to confirm payment
 * @param req
 * @param res
 */
exports.assignSticker = function(req, res) {
    var stickerId = req.body.stickerId;
    console.log('we are in assignSticker');
    stickerManager.assignSticker(stickerId, req.userId,
        function(data){
            res.json(responseDataObject.create(true, data));
        },
        function(e){
            res.json(responseDataObject.create(false, e));
        }
    );
};



