/**
 * Created by razih on 10/10/2016.
 */
var packageService = require('../services/packagesService');
var packageConfig = require('../../config/packageConfig');
var packageEnum = require('../enums/packageEnums');
var _ = require('lodash');

exports.getActivePackages = function(msisdn, successCallback, errorCallback){
    packageService.getActivePackages(msisdn, function(data){
        let activePackages = _.get(data,'result.details.packages', []);
        successCallback(activePackages);
    }, errorCallback);
};

/**
 *
 * @param packageId
 * @returns PackageDataObject
 */
exports.getPackageById = function(packageId){
    var packages = packageService.getCreatedPackage();
    if(typeof stringValue){
        packageId = _.parseInt(packageId);
    }
    return _.find(packages, {id:packageId});
};

/**
 *
 * @param packageName string
 * @returns PackageDataObject
 */
exports.getPackageByName = function(packageName){
    var packages = packageService.getCreatedPackage();
    return _.find(packages, {name:packageName});
};

exports.getCreditPlans = function(){
    return getPlansByType(packageEnum.type.credit);
};

exports.getCallPlans = function(){
   return getPlansByType(packageEnum.type.minutes);
};

exports.getDidPlans = function(){
    return getPlansByType(packageEnum.type.did);
};

exports.redeemCard = function(pinCode){
    return packageService.redeemCard(pinCode);
};

exports.applyPackage = function(packageId, userId, successCallback, errorCallback){
    var packageData = this.getPackageById(packageId);
    if(packageData)
    {
        packageService.applyPackage(userId, packageData.name, successCallback, errorCallback)
    }

    // TODO: throw exception
};

exports.getPackageConfigById = function(packageId) {
  return _.filter(packageConfig, {'id':packageId})[0];
};


function getPlansByType(type)
{
    var packages = packageService.getCreatedPackage();

    var serverPackageIds = packages.map(item => item.id);

    return packageConfig.filter(function(item){
            if(item.type == type && serverPackageIds.indexOf(item.id) !==-1){
                return item;
            }
        });
}
