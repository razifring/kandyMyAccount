'use strict';
var paypal = require('paypal-rest-sdk');
require('../lib/paypalConfig');
var packageManager = require('../lib/managers/packageManager');
var config = require('../config/config');
var responseDataObject = require('../lib/dataObjects/responseDataObject');
var notificationService = require('../lib/services/notificationService');
var _ = require('lodash');
var packageConfig = require('../config/packageConfig');

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

            //apply first purchase bonus
            packageManager.getActivePackages(msisdn,
                function(activePackages){
                    if(activePackages.length == 0 || (activePackages.length == 1 && activePackages[0].id == 2205)) {		//if user hasn't purchase anything yet or has 1 = registration_bonus
                        var first_purchase_bonus_package_id = 2474;		//first_purchase_bonus id

                        console.log('user package count = ' + activePackages.length);
                        console.log('hey ' + first_purchase_bonus_package_id + ' ' + msisdn);


                        packageManager.applyPackage(first_purchase_bonus_package_id, msisdn,
                            function(result) {		//success
                                console.log('YES first_purchase_bonus_applied');
                                console.log(result);
                                notificationService.chat_notification(msisdn, 'Congratulations! You have a first purchase bonus award');

                            },
                            function(e){			//failure
                                console.log(e);
                                console.log('NOT APPLIED first_purchase_bonus_applied 1');

                            }
                        );
                    } else {
                        console.log('NOT APPLIED YES first_purchase_bonus_applied 2');
                        // addRequestedPackage(payment.transactions[0].item_list.items[0].sku, msisdn, paymentId, res);
                    }

                },
                function(result){
                    res.json(responseDataObject.create(false, result));
                }
            );

         //   console.log('hey ' + payment.transactions[0].item_list.items[0].sku + ' ' + msisdn);

            addRequestedPackage(payment.transactions[0].item_list.items[0].sku, msisdn, paymentId, res);


        }
    });
};


function addRequestedPackage(package_id, msisdn, payment_id, res) {
    console.log('hey hello inside addrequested package ' + package_id + ' ' + msisdn);

    packageManager.applyPackage(package_id, msisdn,
        function(result){
            console.log("APPLY PACKAGE RESULT: " +JSON.stringify(result));
            sendPurchaseNotif(package_id,msisdn,res);

            packageManager.getPackageById(package_id,
                function(packageData){
                    var voipId = packageData.voip;
                   // console.log("PACKAGE ID IN APPLY PACKAGE: "+package_id);

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
                    console.log("INSIDE addRequestedPackage PACKAGE IN PAYPAL FOR GET PACKAGE ID(ERROR):"+e);
                    res.json({status: false, message: 'Getting packaged detail failed, please contact customer support. package id: ' + package_id});
                }
            ); // getPackageById
        },
        function(e){
            console.log(e);
            res.json({status: false, message: 'Purchase failed, please contact customer support. payment id: ' + payment_id});
        }
    );
}

/*SEND CHAT NOTIF EVERY PURCHASE*/
function sendPurchaseNotif(package_id,msisdn,res){
    console.log("i am inside sendPurchaseNotif");

    packageManager.getActivePackages(msisdn,
         function(activePackages){
             if(activePackages) {
                 var end_time;
                 var lastPackageId;
                 console.log("T H I S  IS my P A C K A G E  L I S T: ");

                 console.log(JSON.stringify(activePackages));
                 console.log("this is my purchased package id: "+package_id);

                for(let i=0; i<activePackages.length; i++){ //get last data object
                    end_time = activePackages[i].endTime;
                    lastPackageId = activePackages[i].id;
                }
                 console.log("T H I S  IS THE  E N D  T I M E: "+end_time);
                 console.log("T H I S  IS THE  L A S T P A C K A G E I D: "+JSON.stringify(lastPackageId));
                if(package_id == lastPackageId){
                    console.log("package purchase is applied");
                    // let userPackage = _.find(packageConfig, {'id': package_id});
                    let packageId = _.parseInt(package_id);
                    let userPackage = _.filter(packageConfig, {'id':packageId})[0];
                    console.log("T H I S  IS THE USER PACKAGE: "+userPackage);
                    let type  = userPackage.type;
                    let message = userPackage.mesg;
                    console.log("T H I S  IS THE USER PACKAGE: "+userPackage);
                    console.log("T H I S  IS THE USER PACKAGE TYPE: "+type);

                    var d = new Date(end_time);
                    console.log("this is the end time: ");
                    console.log( pad(d.getMonth() + 1, 2) + '/' + pad(d.getDate(), 2) + '/' + d.getFullYear() + ' ' + pad(d.getHours() + 1, 2) + ':' + pad(d.getMinutes() + 1, 2) );
                    let new_time = ( pad(d.getMonth() + 1, 2) + '/' + pad(d.getDate(), 2) + '/' + d.getFullYear() + ' ' + pad(d.getHours() + 1, 2) + ':' + pad(d.getMinutes() + 1, 2) );
                     if(type === "credit"){ //if credit concat end time
                         let msg = message+new_time;

                         console.log('purchased is credit');
                         console.log("T H I S  IS THE  U S E R  P A C K A G E S: "+JSON.stringify(userPackage));
                         notificationService.chat_notification(msisdn,msg);
                     }else{
                         console.log('purchased not credit');
                         console.log("T H I S  IS THE  U S E R  P A C K A G E S: "+JSON.stringify(userPackage));
                         notificationService.chat_notification(msisdn,message);
                     }
                }else{
                    console.log("Not apply package purchase");
                }

             } else {
                console.log('NOT APPLIED PURCHASE');

             }

         },
         function(result){
         res.json(responseDataObject.create(false, result));
         }
    ); //end package manager
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


