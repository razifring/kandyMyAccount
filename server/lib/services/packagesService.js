/**
 * Created by razih on 10/13/2016.
 */
var packeDataObject = require('../dataObjects/packageDataObject') ;
var config = require('../../config/config');
var kandyRequest = require('../common/kandyRequest') ;

var PackageStub = [{
        "package_name": "PLDT_Telebabad_30_Days",
        "package_id": 1378,
        "cost": 7.99
    },
    {
        "package_name": "PLDT_Telebabad_7_Days",
        "package_id": 1377,
        "cost": 24.99
    },
    {
        "package_name": "PLDT_Philippines_30_minutes_package",
        "package_id": 1379,
        "cost": 4.99
    },
    {
        "package_name": "PLDT_Philippines_65_minutes_package",
        "package_id": 1380,
        "cost": 9.99
    },
    {
        "package_name": "PLDT_Philippines_100_minutes_package",
        "package_id": 1381,
        "cost": 14.99
    },
    {
        "package_name": "PLDT_VOIP number package(InApp)",
        "package_id": 1456,
        "cost": 0.99
    },
    {
        "package_name": "PLDT_Credit_4.99",
        "package_id": 1374,
        "cost": 4.99
    },
    {
        "package_name": "PLDT_Credit_9.99",
        "package_id": 1375,
        "cost": 9.99
    },
    {
        "package_name": "PLDT_Credit_14.99",
        "package_id": 1376,
        "cost": 14.99
    }

];

exports.getCreatedPackage = function(){
  var kandyPackages = PackageStub; // should change with api to kandy

  return kandyPackages.map(function(item){
      return packeDataObject.createFromKandy(item);
  });
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
