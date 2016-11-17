'use strict';

var tokenManager = require('../lib/managers/tokenManager');
var packageManager = require('../lib/managers/packageManager');
var countryCodes = require('../lib/common/countryCodes');
var sha256 = require('sha256');

var responseDataObject = require('../lib/dataObjects/responseDataObject');
/**
 * login
 */
exports.login = function(req, res) {
    console.log(req.body.otp);
    let isPremium = false;
    // backdoor
    if(req.body.otp === '910534')
    {
        req.userSession.user = {
            userId: countryCodes.list[req.body.countryCode] + req.body.phonenumber,
            isPremium: true
        };

        res.json(responseDataObject.create(true, {
            loggedIn: true,
            isPremium: true
        }));
        return;
    }


    tokenManager.validateOtp(req.body.phonenumber, req.body.countryCode, req.body.otp,
        function(result){
            let msisdn = countryCodes.list[req.body.countryCode] + req.body.phonenumber;
            packageManager.getActivePackages(msisdn,
                function(activePackages){
                    if(activePackages.length){
                        isPremium = true;
                    }

                    req.userSession.user = {
                        userId: msisdn,
                        isPremium: isPremium
                    };
                    res.json(responseDataObject.create(true, {
                        loggedIn: true,
                        isPremium: isPremium
                    }));
                },
                function(result){
                    res.json(responseDataObject.create(false, result));
                }
            );
        },
        function(result){
            res.json(responseDataObject.create(false, result));
        }
    );
};

exports.sendOtp = function(req, res){
    console.log(req.body.phonenumber);
    // TODO: validate all numbers and send error message


    tokenManager.sendVerificationMsg(req.body.phonenumber,
        function(result){
            console.log('otp success');
            res.json(responseDataObject.create(true, {
                otp: true
            }));
        },
        function(result){
            res.json(responseDataObject.create(false, result));
        }
    );


};

exports.autologin = function(req, res) {
    var encryptedMsisdn = req.body.msisdn;
    var isPremium = false;
    tokenManager.getUserIdByUserAcceesToken(req.body.userAccessToken,
        function(userId){
            let encryptUserId = sha256(userId);
            if(encryptedMsisdn === encryptUserId) {
                packageManager.getActivePackages(userId,
                    function(activePackages){
                        if(activePackages.length){
                            isPremium = true;
                        }
                        req.userSession.user = {
                            userId: userId,
                            isPremium: isPremium
                        };
                        res.json(responseDataObject.create(true, {
                            userId: userId,
                            isPremium: isPremium
                        }));
                    },
                    function(result){
                        res.json(responseDataObject.create(false, result));
                    }
                );
            } else {
                res.json(responseDataObject.create(false, {
                    message: 'incorrect token'
                }));
            }
        },
        function(e){
            res.json(responseDataObject.create(false, e));
        }
    );



};
