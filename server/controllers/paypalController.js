'use strict';
var paypal = require('paypal-rest-sdk');
require('../lib/paypalConfig');
var packageManager = require('../lib/managers/packageManager');
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
exports.createPayment = function(req, res) {

    var packageId = req.body.packageId;
    var packageData = packageManager.getPackageById(packageId);
    var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal",
            },
        "redirect_urls": {
            "return_url": config.paypal.getPaypalReturnUrl() + '/' + req.userId,
            "cancel_url": config.paypal.getPaypalCancelUrl()
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": packageData.name,
                    "sku": packageData.id,
                    "price": packageData.cost,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "custom": req.body.msisdn,
            "amount": {
                "currency": "USD",
                "total": packageData.cost
            },
            "description": "You are about to purchase a 30 day subscription to " + packageData.name
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.json(responseDataObject.create(false, error));
        } else {
            if(payment.payer.payment_method === 'paypal') {
                req.session.paymentId = payment.id;
                var redirectUrl;
                for(var i=0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                res.json(responseDataObject.create(true, {redirectUrl:redirectUrl}));
            }
        }
    });
};


exports.executePayment = function(req, res) {
    var paymentId = req.body.paymentId;
    var payerId = req.body.payerId;
    var msisdn = req.body.msisdn;

    console.log('msisdn is: ' + msisdn);

    var execute_payment_json = {
        "payer_id": payerId
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            packageManager.applyPackage(payment.transactions[0].item_list.items[0].sku, msisdn,
                function(result){
                    console.log(result);
                    res.json({status: 'ok'});
                },
                function(e){
                    console.log(e);
                }
            );
        }
    });
};

exports.test = function(req,res) {
    var d = packageManager.getPackageById('1374');
    console.log(d.name);
}

