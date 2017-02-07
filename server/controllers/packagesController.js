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
            res.setHeader('Cache-Control', 'no-cache'); // one year
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
    packageManager.getAllPackages(true, function(allPackages){
        var packages = {
            creditPlans: packageManager.getCreditPlans(allPackages),
            callPlans: packageManager.getCallPlans(allPackages),
            didPlans: packageManager.getDidPlans(allPackages)
        };
        res.setHeader('Cache-Control', 'public, max-age=300'); // one year
        res.json(packages);
    },
    function(e){
        res.json(responseDataObject.create(false, e));
    });
};

exports.redeemCard = function(req, res){
    var pinCode = req.body.cardNumber;
    packageManager.redeemCard(pinCode, req.userId,
        function(data){
            res.json(responseDataObject.create(true, {}));
        },
        function(e) {
            res.json(responseDataObject.create(false, e));
        }
    );
};

exports.validatePurchasePackage =  function(req, res){
    var packageIdToValidate = req.body.packageId;
    var msisdn = req.body.msisdn;
    //console.log("im an in validate purchase package: "+packageIdToValidate+" : "+msisdn);

    packageManager.getActivePackages(msisdn,
        function(userActivePackages){
            if(userActivePackages){
                console.log("packages in validation: "+userActivePackages);
                packageManager.validatePackageById(packageIdToValidate,msisdn,userActivePackages,
                    function(result){
                        res.setHeader('Cache-Control', 'no-cache'); // one year
                        res.json({status: true, body:{result}});
                    },
                    function(e){
                        res.json(responseDataObject.create(false, e));
                    }
                );
            }else{
                var result={isValid:true, message:"No active package"};
                res.setHeader('Cache-Control', 'no-cache'); // one year
                res.json({status: true, body:{result}});
                // console.log("No existing packages");
            }
        },
        function(e){
            res.json(responseDataObject.create(false, e));
        }
    );

};
