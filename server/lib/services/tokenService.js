var simpleRequest = require('../common/simpleRequest') ;
var kandyRequest = require('../common/kandyRequest') ;
var config = require('../../config/config') ;

exports.getDomainAccess = function(key, secret, successCallback) {
    var url = config.kandyApi.apiUrl + 'AccessTokens?key=' +  key + '&domain_api_secret=' + secret;
    console.log(url);
    simpleRequest.get(url, function(data){
        successCallback(data.result.domain_access_token);
    },
    function(data){
        console.log(data);
    });
};

exports.sendVerificationMsg = function(msisdn, successCallback, errorCallback) {
    var url = config.kandyApi.apiUrl + 'verifications/chats?user_id=' + msisdn;
    kandyRequest.post(url, {}, function(result){
            successCallback(result);
        },
        function(result){
            console.log(result);
            errorCallback(result);
        });
};

exports.validateOtp = function(phoneNumber, countryCode, validationCode, successCallback, errorCallback) {
    var url = config.kandyApi.apiUrl +
        'verifications/codes?user_phone_number=' + phoneNumber +
        '&user_country_code=' + countryCode +
        '&validation_code=' + validationCode;
    kandyRequest.get(url, function(result){
            successCallback(result);
        },
        function(result){
            errorCallback(result);
        });
};

exports.getUserDetailsByUserAccessToken = function(userAccessToken, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'users/details?user_access_token='+userAccessToken;
    kandyRequest.get(url, function(result){
            kandyRequest.successCallback(result, successCallback, errorCallback)
        },
        function(result){
            errorCallback(result);
        });
};

exports.getUserAccessToken = function(key, secret, userId, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'users/accessTokens?key=' + key +
        '&domain_api_secret=' + secret +
        '&user_id=' + userId;
    console.log("TOKEN SERVICE FOR UAT: "+url);
        simpleRequest.get(url, function(data){
            successCallback(data.result.user_access_token);
        },
        function(data){
            errorCallback(data);
        });
};


