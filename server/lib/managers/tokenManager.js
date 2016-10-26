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
    console.log('access token is:' + accessToken);
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
    console.log(config.kandyApi.domainApiKey);
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

