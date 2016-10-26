'use strict';

var tokenManager = require('../lib/managers/tokenManager');
var responseDataObject = require('../lib/dataObjects/responseDataObject');
/**
 * login
 */
exports.login = function(req, res) {
    console.log(req.body.otp);

    tokenManager.validateOtp(req.body.phonenumber, req.body.countryCode, req.body.otp,
        function(result){
            res.json(responseDataObject.create(true, {
                token: 'fake-jwt-token'
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
