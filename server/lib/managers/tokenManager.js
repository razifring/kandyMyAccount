/**
 * Created by razih on 10/10/2016.
 */
var config = require('../../config/config') ;
var tokenService = require('../services/tokenService');
var cacheManager = require('../common/cache');
var kandyRequest = require('../common/kandyRequest');

/**
 *
 * @returns string
 * @param successCallback
 */
exports.getDomainAccessToken = function(successCallback){

    var accessToken = cacheManager.getDomainToken();
    if(!accessToken)
    {
        this.renewDomainAccessToken(successCallback)
    }
    else
    {
        successCallback(accessToken);
    }
};

exports.renewDomainAccessToken = function(successCallback){
    tokenService.getDomainAccess(
        config.kandyApi.domainApiKey,
        config.kandyApi.domainApiSecret,
        function(token){
            cacheManager.setDomainToken(token);
            successCallback(token);
        }
    );
};

exports.sendVerificationMsg = function(msisdn, successCallback, errorCallback){
    tokenService.sendVerificationMsg(msisdn, function(result){
        kandyRequest.successCallback(result, successCallback, errorCallback)
    }, errorCallback);
};


exports.validateOtp = function(phoneNumber, countryCode, validationCode, successCallback, errorCallback){
    tokenService.validateOtp(phoneNumber, countryCode, validationCode,  function(result){
        kandyRequest.successCallback(result, successCallback, errorCallback)
    }, errorCallback);
};

exports.hasAuthorization = function (req, res, next) {
    console.log(req.userId);
    if (!req.userId) {
        res.status(401).send('User is not authorized');
    } else {
        next();
    }
};

exports.getUserIdByUserAccessToken = function (userAccessToken, successCallback, errorCallback) {

    tokenService.getUserDetailsByUserAccessToken(userAccessToken,  function(result){
        console.log('getUserIdByUserAccessToken' + result.result.user.user_id);
        successCallback(result.result.user.user_id)
    }, errorCallback);
};

exports.getStickerUserAccessToken = function (userId,successCallback,errorCallback){
    tokenService.getUserAccessToken(
        config.kandyApi.domainApiKey,
        config.kandyApi.domainApiSecret,
        userId,
        function(data){
            console.log("USER ACCESS TOKEN: "+data);
            successCallback(data);
        },errorCallback);
};