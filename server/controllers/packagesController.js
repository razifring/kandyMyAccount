'use strict';

var packageManager = require('../lib/managers/packageManager');
var responseDataObject = require('../lib/dataObjects/responseDataObject');
var userPackageDataObject = require('../lib/dataObjects/userPackageDataObject');

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
    packageManager.getAllPackages(function(allPackages){
        var packages = {
            creditPlans: packageManager.getCreditPlans(allPackages),
            callPlans: packageManager.getCallPlans(allPackages),
            didPlans: packageManager.getDidPlans(allPackages)
        };
        res.json(packages);
    },
    function(){
        res.json(responseDataObject.create(false, e));
    });
};

exports.redeemCard = function(req, res){
    var pinCode = req.body.cardNumber;
    packageManager.redeemCard(pinCode, req.userId);
    console.log(pinCode);
    res.json(true);
};
