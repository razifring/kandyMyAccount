'use strict';

var packageManager = require('../lib/managers/packageManager');
/**
 * List of Pakcages
 */
exports.getUserPackages = function(req, res) {
    packageManager.getActivePackages(req.params.msisdn, function(packages){
        res.json(packages);
    });

    console.log(req.params);
    var packages = [{
        'id': 11,
        'name': 'Telebabad 30 Days',
        'usage': '4030 minutes left ',
        'expire': '2016-09-16'
    },{
        'id': 12,
        'name': 'Telebabad 7 Days',
        'usage': '1007 minutes left',
        'expire': '2016-10-16'
    },
        {
            'id': 13,
            'name': 'Telebabad 5 Days',
            'usage': '1227 minutes left',
            'expire': '2016-05-16'
        }
    ];

    //res.json(packages);
};

exports.getPurchasable = function(req, res) {
    console.log(req.params);
    var packages = {
        callPlans: packageManager.getCallPlans(),
        didPlans: packageManager.getDidPlans()
    };

    res.json(packages);
};

exports.redeemCard = function(req, res){
    var cardNum = req.body.cardNumber;
    console.log(cardNum);
    res.json(true);
};
