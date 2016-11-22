/**
 * Created by razih on 10/10/2016.
 */
var paypal = require('paypal-rest-sdk');
require('../paypalConfig');
var config = require('../../config/config');
var stickerService = require('../services/stickerService');
var _ = require('lodash');

exports.createPayment = function(paymentName, itemId, cost, userId, returnUrl,  successCallback, errorCallback){
    console.log('we are in create payment');
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal",
        },
        "redirect_urls": {
            "return_url": returnUrl + '/' + userId,
            "cancel_url": config.paypal.getPaypalCancelUrl()
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": paymentName,
                    "sku": itemId,
                    "price": cost,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "custom": userId,
            "amount": {
                "currency": "USD",
                "total": cost
            },
            "description": "You are about to purchase a 30 day subscription to " + paymentName
        }]
    };
console.log(create_payment_json);
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            errorCallback(error);
        } else {
            if(payment.payer.payment_method === 'paypal') {
                var redirectUrl;
                for(var i=0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                successCallback({redirectUrl:redirectUrl});
            }
        }
    });
};