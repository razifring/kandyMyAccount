/**
 * Created by razih on 10/10/2016.
 */
var packageService = require('../services/packagesService');
var packageConfig = require('../../config/packageConfig');
var packageEnum = require('../enums/packageEnums');
var _ = require('lodash');
var packageDataObject = require('../dataObjects/packageDataObject') ;
var userPackageDataObject = require('../dataObjects/userPackageDataObject');
var allPackages = [];

exports.getAllPackages = function(successCallback, errorCallback){

    this.getAllKandyPackages(function(allPackages){

        let mapPackageIdsNames = allPackages.reduce(function(total, current){
            total[current.package_id] = current.package_name;
            return total;
        });


        let serverPackageIds = _.keys(mapPackageIdsNames);
        let packageDataAndMetaData = packageConfig.filter(function(item){
            if(serverPackageIds.indexOf(item.id.toString()) !== -1){
                return item;
            }
        });
        let kandyPackages = packageDataAndMetaData.map(function(item){
            return packageDataObject.createFromPackagesConfig(item, mapPackageIdsNames[item.id]);
        });

        successCallback(kandyPackages);
    }, errorCallback);
};

exports.getAllKandyPackages = function(successCallback, errorCallback){
    if(allPackages.length > 0)
    {
        successCallback(allPackages);
        return;
    }
    packageService.getCreatedPackage(function(data){
        allPackages = data.result.packages;
        console.log('all packages are:');
        console.log(allPackages);
        successCallback(allPackages);
    }, errorCallback);
};

exports.getActivePackages = function(msisdn, successCallback, errorCallback){
    let self = this;
    packageService.getActivePackages(msisdn, function(data){
        let activePackages = _.get(data,'result.details.packages', []);
        let userActivePackages = [];
        self.getAllKandyPackages(function(allPackagesKandyData){
            for(let i =0; i < activePackages.length; i++){
                let kandyPackageData = _.find(allPackagesKandyData, {package_name:activePackages[i].meta_package});
                userActivePackages.push(userPackageDataObject.createFromKandy(activePackages[i], kandyPackageData.package_id));
            }
            successCallback(userActivePackages);
        }, errorCallback);
    }, errorCallback);
};

/**
 *
 * @param packageId
 * @param successCallback
 * @param errorCallback
 * @returns PackageDataObject
 */
exports.getPackageById = function(packageId, successCallback, errorCallback){
    this.getAllPackages(function(packages){
        console.log('inside getPackageById');
        console.log(packages);
        if(typeof stringValue){
            packageId = _.parseInt(packageId);
        }
        let myPackage = _.find(packages, {id:packageId});
        successCallback(myPackage);
    }, errorCallback);

};

/**
 *
 * @param packageName string
 * @param successCallback
 * @param errorCallback
 * @returns PackageDataObject
 */
exports.getPackageByName = function(packageName, successCallback, errorCallback){
    this.getAllPackages(function(packages){
        let myPackage = _.find(packages, {name:packageName});
        console.log('this is packages');
        console.log(packages);
        successCallback(myPackage);
    }, errorCallback);

};

exports.getCreditPlans = function(allKandyPackages){
    return getPlansByType(packageEnum.type.credit, allKandyPackages);
};

exports.getCallPlans = function(allKandyPackages){
   return getPlansByType(packageEnum.type.minutes, allKandyPackages);
};

exports.getDidPlans = function(allKandyPackages){
    return getPlansByType(packageEnum.type.did, allKandyPackages);
};

exports.redeemCard = function(pinCode){
    return packageService.redeemCard(pinCode);
};

exports.applyPackage = function(packageId, userId, successCallback, errorCallback){
    this.getPackageById(packageId, function(packageData){
        if(packageData)
        {
            packageService.applyPackage(userId, packageData.name, successCallback, errorCallback);

            // if sticker package then apply stickers here:
        }
    }, errorCallback);

    // TODO: throw exception
};

exports.getPackageConfigById = function(packageId) {
    packageId = _.parseInt(packageId);
  return _.filter(packageConfig, {'id':packageId})[0];
};


function getPlansByType(type, allKandyPackages)
{
    var serverPackageIds = allKandyPackages.map(item => item.id);

    return packageConfig.filter(function(item){
            if(item.type == type && serverPackageIds.indexOf(item.id) !==-1){
                return item;
            }
        });
}
