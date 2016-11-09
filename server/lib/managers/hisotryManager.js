/**
 * Created by razih on 10/10/2016.
 */
var historyService = require('../services/historyService');
var packageManager = require('./packageManager');
var _ = require('lodash');

exports.getHistory = function(msisdn, type, start, end, successCallback, errorCallback){
    if(type === 'calls') {
        historyService.getCallHistory(msisdn, start, end, function(data){
            successCallback(data.result.calls);
        }, errorCallback);
    } else if(type === 'sms') {
        historyService.getSmsHistory(msisdn, start, end, function(data){
            successCallback(data.result.smss);
        }, errorCallback);
    } else if(type === 'packages') {
        historyService.getPackagesHistory(msisdn, start, end, function(data){
            let packages = data.result.packages.map(package => {
                let packageData = packageManager.getPackageConfigById(package.package_id);
                console.log(packageData);
                return {
                    'transaction_time': package.transaction_time,
                    'name': packageData.title,
                    'cost': packageData.cost
                }
            });
            successCallback(packages);
        }, errorCallback);
    }

};
