/**
 * Created by razih on 10/10/2016.
 */
var stickerService = require('../services/stickerService');
var paypalManager = require('./paypalManager');
var _ = require('lodash');

exports.assignSticker = function(stickerid, userId, successCallback, errorCallback){
    if(true /* if sticker costs money */) {
        let paymentName = 'my temp paymnet'; // TODO get this informatino from http://pldt.sticker....
        let cost = 9.99; // TODO get real cost from json
        paypalManager.createPayment(paymentName, stickerid, cost, userId, successCallback,errorCallback);
    } else {
        stickerService.assignSticker(stickerid, userId, successCallback, errorCallback);
    }
}