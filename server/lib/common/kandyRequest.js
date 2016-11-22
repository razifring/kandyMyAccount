/**
 *  # Simple request module
 *  This module simplifies the 'request' module even more by implementing a common response handling code which usually is rewritten in every 'request' using node.
 *  @module Simple request
 *  @class Simple request
 */
var simpleRequest = require('./simpleRequest');
var tokenManager = require('../managers/tokenManager');
var _ = require('lodash');

exports.get = function(url, successCallback, errorCallback){
    var self = this;
    tokenManager.getDomainAccessToken(function(token){
        if(url.indexOf('?') > -1){
            url = url + '&';
        } else if(url.indexOf()) {
            url = url + '?';
        }
        var urlWithToken = url + 'key=' + token;
        console.log(urlWithToken);
        simpleRequest.get(urlWithToken, successCallback, function(error){
            if(error.code === 403){
                tokenManager.renewDomainAccessToken(function(){
                    self.get(url, successCallback, errorCallback);
                });
            }else{
                console.log(error.message);
                errorCallback({message: error.message, code: error.code});
            }
        });
    });

};

exports.post = function(url, data, successCallback, errorCallback){
    var self = this;
    tokenManager.getDomainAccessToken(function(token){
        var urlWithToken = url + '&key=' + token;
        console.log(urlWithToken);
        simpleRequest.post(urlWithToken, JSON.stringify(data), '', successCallback, function(error){
            if(error.code === 403){
                tokenManager.renewDomainAccessToken(function(){
                    self.post(url, data, successCallback, errorCallback);
                });
            }else{
                errorCallback({message: error.message, code: error.code});
            }
        });
    });
};

exports.put = function(url, data, successCallback, errorCallback){
    var self = this;
    tokenManager.getDomainAccessToken(function(token){
        if(url.indexOf('?') > -1){
            url = url + '&';
        } else if(url.indexOf()) {
            url = url + '?';
        }

        var urlWithToken = url + 'key=' + token;
        console.log(urlWithToken);
        simpleRequest.put(urlWithToken, JSON.stringify(data), { 'content-type': 'application/json' }, successCallback, function(error){
            console.log('kandyRequest Error');
            if(error.code === 403){
                tokenManager.renewDomainAccessToken(function(){
                    self.put(url, data, successCallback, errorCallback);
                });
            }else{
                errorCallback({message: error.message, code: error.code});
            }
        });
    });
};

exports.successCallback = function(result, successCallback, errorCallback){
    console.log(result);
    let res = (_.isString(result))?JSON.parse(result):result;
    if(res.status === 0)
    {
        successCallback(result);
    }
    else
    {
        errorCallback({message: res.message, code: res.status});
    }
};
