/**
 * Created by razih on 10/13/2016.
 */

var config = require('../../config/config');
var kandyRequest = require('../common/kandyRequest') ;

exports.getCreatedPackage = function(successCallback, errorCallback){
  var url = config.kandyApi.apiUrl + 'billing/packages/all?x=1';
  kandyRequest.get(url, function(data){
      kandyRequest.successCallback(data, successCallback, errorCallback);
  },errorCallback);
};

exports.getActivePackages = function(userId, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'billing/users/packages/status/active?user_id=' + userId;
    kandyRequest.get(url, function(data){
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};

exports.redeemCard = function(pinCode, userId, successCallback, errorCallback){
    let url = config.kandyApi.apiUrl + 'users/billing/topup/card';
    let params = {
        'user_id': userId,
        'pin_code': pinCode
    };
    kandyRequest.put(url, params, function(data){
        console.log('packages are '+data);
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};


exports.applyPackage = function(userId, packageName, successCallback, errorCallback){
    let url = config.kandyApi.apiUrl + 'billing/users/packages/add';
    let params = {
      "user_id": userId,
      "package_name": packageName,
      "settings": {
          "auto_renew": false
      }
    };
    kandyRequest.put(url, params, successCallback, errorCallback);
};
