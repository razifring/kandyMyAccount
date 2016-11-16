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
    var url = config.kandyApi.apiUrl + 'billing/topup/card?user_id=' + userId;
    kandyRequest.put(url, function(data){
        console.log('packages are '+data);
        successCallback(data);
    },errorCallback);
};


exports.applyPackage = function(userId, packageName, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'billing/users/packages/add?user_id=' + userId + '&package_name='+packageName;
    kandyRequest.put(url, {}, successCallback, errorCallback);
};
