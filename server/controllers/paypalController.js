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
    packageManager.getPackageById(packageId, function(packageData){
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
    },
    function(error){
        res.json(responseDataObject.create(false, error));
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
            res.json({status: false, message: 'Purchase failed, please try again'});
        } else {
            packageManager.applyPackage(payment.transactions[0].item_list.items[0].sku, msisdn,
                function(result){
                    console.log("apply package result: " +result);

                    packageManager.getPackageById(payment.transactions[0].item_list.items[0].sku,
                        function(packageData){
                            var voipId = packageData.voip;
                            console.log("VOIP ID:"+voipId);

                            if(voipId > 0){
                                //apply package here
                                packageManager.applyPackage(voipId, msisdn,
                                    function(result) {
                                        console.log("result in assign VOIP");
                                        console.log(result);
                                        res.json({status: true});
                                    },
                                    function(e){
                                        console.log(e);
                                        res.json({status: false, message: 'VOIP package assign failed, please contact customer support. VOIP id: ' + voipId});
                                    }
                                );

                            } else{

                                res.json({status: true});
                            }

                          //  res.json({status: true});

                        },
                        function(e){
                            console.log("INSIDE APPLY PACKAGE IN PAYPAL FOR GET PACKAGE ID(ERROR):"+e);
                           // res.json({status: false, message: 'Purchase failed, please contact customer support. payment id: ' + paymentId});
                        }
                    );
                },
                function(e){
                    console.log(e);
                    res.json({status: false, message: 'Purchase failed, please contact customer support. payment id: ' + paymentId});
                }
            );
        }
    });
};



