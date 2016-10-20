/**
 * Created by razih on 10/10/2016.
 */
var packageService = require('../services/packagesService');
var packageConfig = require('../../config/packageConfig');
var packageEnum = require('../enums/packageEnums');
var _ = require('lodash');

/**
 *
 * @param packageId
 * @returns packageDataObject
 */
exports.getPackageById = function(packageId){
    var packages = packageService.getCreatedPackage();
    return _.find(packages, {id:packageId});
};

exports.getCallPlans = function(){
   return getPlansByType(packageEnum.type.call)
};

exports.getDidPlans = function(){
    return getPlansByType(packageEnum.type.did);
};


function getPlansByType(type)
{
    var packages = packageService.getCreatedPackage();

    var callPlansIds = packageConfig.filter(function(item){
            if(item.type == type){
                return item.id;
            }
        })
        .map(item => item.id);
    return packages.filter(function(item){
        return (callPlansIds.indexOf(item.id) !==-1);
    });
}
