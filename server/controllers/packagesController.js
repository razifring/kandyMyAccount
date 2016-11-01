'use strict';

var packageManager = require('../lib/managers/packageManager');
var responseDataObject = require('../lib/dataObjects/responseDataObject');

/**
 * List of Pakcages
 */
exports.getUserPackages = function(req, res) {
    packageManager.getActivePackages(req.params.msisdn,
        function(packages){
            res.json(responseDataObject.create(true, {
                packages: packages
            }));
        },
        function(e){
            res.json(responseDataObject.create(false, e));
        }
    );
};

exports.getPurchasable = function(req, res) {
    console.log(req.params);
    var packages = {
        creditPlans: packageManager.getCreditPlans(),
        callPlans: packageManager.getCallPlans(),
        didPlans: packageManager.getDidPlans()
    };

    res.json(packages);
};

exports.redeemCard = function(req, res){
    var pinCode = req.body.cardNumber;
    packageManager.redeemCard(pinCode, req.userId);
    console.log(pinCode);
    res.json(true);
};
