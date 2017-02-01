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
var apiCache = require('apicache');
var topupConfig = require('../../config/topupConfig');

exports.getAllPackages = function(onlyPurchasable, successCallback, errorCallback){

    this.getAllKandyPackages(function(allPackages){

        // create a map of package id to names for all packages
        let mapPackageIdsNames = allPackages.reduce(function(total, current){
            total[current.package_id] = current.package_name;
            return total;
        });


        // filter packageConfig to only return packages that came from Kandy
        let serverPackageIds = _.keys(mapPackageIdsNames);
        let packageDataAndMetaData = packageConfig.filter(function(item){
            if(serverPackageIds.indexOf(item.id.toString()) !== -1){
                if(!onlyPurchasable ||  (onlyPurchasable && _.get(item, 'purchasable', true))){
                    return item;
                }
            }
        });

        // create data objects
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
                if(kandyPackageData) {
                    let dataObject = userPackageDataObject.createFromKandy(activePackages[i], kandyPackageData.package_id);
                    if(dataObject) {
                        userActivePackages.push(dataObject);
                    }
                }
                console.log('WARNING: missing kandy package: ' +  JSON.stringify(activePackages[i]));
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
    this.getAllPackages(false, function(packages){
        console.log('inside getPackageById, package id: ' . packageId);
        console.log(packages);
        if(typeof stringValue){
            packageId = _.parseInt(packageId);
        }
        let myPackage = _.find(packages, {id:packageId});
        console.log("This is my package");
        console.log(myPackage);
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
    this.getAllPackages(false, function(packages){
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

exports.redeemCard = function(pinCode, userId, successCallback, errorCallback){
    let self = this;
    packageService.redeemCard(pinCode, userId, function(){
        packageService.getTopupCard(pinCode, function(pinCodeData){
            let serial = _.get(pinCodeData, 'result[0].serial');
            if(serial){
                let serialPrefix = serial.substr(0,5);
                let prefixConfig = _.get(topupConfig, serialPrefix);
                if(prefixConfig){
                    for(let i = 0, len = prefixConfig.packages.length; i < len; i++ ){
                        self.applyPackage(prefixConfig.packages[i], userId, successCallback, errorCallback)
                    }
                }
                apiCache.clear('/api/packages/:msisdn');
            }

        }, errorCallback);

    }, errorCallback);

};

/**
 * Add a package to a user.
 * If package is of type DID, also attach a did number.
 *
 * @param packageId
 * @param userId
 * @param successCallback
 * @param errorCallback
 */
exports.applyPackage = function(packageId, userId, successCallback, errorCallback){
    this.getPackageById(packageId, function(packageData){
        if(packageData){
            console.log('packageData: ' + JSON.stringify(packageData));
            console.log('package data name: '+packageData.name);
            if(packageData.hasDid === true){
                // after applying package, associate a did.
                packageService.applyPackage(userId, packageData.name, function(applyResult){
                    applyResult = JSON.parse(applyResult);
                    console.log("APPLY RESULT IN packageManager.applyPackage: "+ JSON.stringify(applyResult));
                    let packageClientId = _.get(applyResult, 'result.assignmentId');
                    if(packageClientId)  {
                      packageService.associateDid(userId, packageClientId, function(didNumber){
                          successCallback(packageData);
                      }, errorCallback);
                    } else {
                      successCallback(packageData);
                    }
                }, errorCallback);
            } else {
                packageService.applyPackage(userId, packageData.name, successCallback, errorCallback);
            }

            apiCache.clear('/api/packages/' + userId);

            // if sticker package then apply stickers here:
        }
    }, errorCallback);

    // TODO: throw exception
};

exports.getPackageConfigById = function(packageId) {
    packageId = _.parseInt(packageId);
  return _.filter(packageConfig, {'id':packageId})[0];
};

exports.hasDidPackage = function(userId, successCallback, errorCallback){
  this.getActivePackages(userId, function(userPackages){
      let didPackage = _.find(userPackages, {'type': packageEnum.type.did});
      return _.get(didPackage, '0', false);
  }, errorCallback);
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

/**
 *
 * @param packageId
 * @param msisdn
 * @param userActivePackages
 * @param successCallback
 * @param errorCallback
 * @returns Boolean
 */
exports.validatePackageById = function(packageId, msisdn, userActivePackages, successCallback, errorCallback){

    // console.log("THIS IS MY PACKAGES IN MANAGER: "+JSON.stringify(userActivePackages));
    this.getPackageById(packageId,function(packageData) {
        var requestedPackageType;
        let packageValid = null;
        let messagePrompt = "";

        if(packageData){
            console.log("PACKAGE DATA I WANT TO PURCHASE: "+JSON.stringify(packageData));
            requestedPackageType = packageData.type;

            if(requestedPackageType === "credit"){
                packageValid = true;
                messagePrompt = "You can avail multiple credit";

            } else if (requestedPackageType === "minutes") {
                if(userActivePackages){
                    let activeTelebabad = false;
                    let activeCall = false;

                    for (let i = 0; i < userActivePackages.length; i++) {
                        let userActivePackageId = userActivePackages[i].id;

                        if (!activeTelebabad && (userActivePackageId == 2233 || userActivePackageId == 2234)) {
                            activeTelebabad = true;
                        }
                        if(!activeCall && userActivePackageId == 2328 ){//check if already register to a call plan
                            activeCall = true;
                        }
                    } // end of for

                    console.log("Active Call: "+activeCall+" Active Telebabad: "+activeTelebabad+" Package Found: ");
                    /** for telebabad verification**/
                    if((packageId == 2233) || packageId == 2234){
                        if((activeTelebabad === false)){
                            packageValid = true;
                        }else{
                            packageValid = false;
                            messagePrompt = "You are still registered to a Telebabad plan. Please register again upon expiry of your Telebabad plan.";
                        }
                    }

                    /** for call and plan verification**/
                    if(packageId == 2328){
                        if(activeCall === false && activeTelebabad === false){
                            packageValid = true;
                        }else if (activeTelebabad === true){
                            packageValid = false;
                            messagePrompt = "You are still registered to a Telebabad plan. Please register again upon expiry of your Telebabad plan.";
                        }
                        else{
                            packageValid = false;
                            messagePrompt ="You are still registered to a US$0.99 6 minute package. Please register again upon expiry of your call plan.";
                        }
                    }
                }

            } else {
                packageValid = true;
                messagePrompt = "No active packages";
            }

            let packageValidation = {isValid:packageValid, message:messagePrompt };
            successCallback(packageValidation);
            // console.log("This is the package Validation response");
            // console.log(packageValidation);

        }else{
            successCallback(packageValidation);
            // console.log("This is no active validation response :"+packageData);
            //console.log(packageData);
        }
    },errorCallback);

};

