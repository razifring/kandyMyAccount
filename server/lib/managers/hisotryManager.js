/**
 * Created by razih on 10/10/2016.
 */
var historyService = require('../services/historyService');
var _ = require('lodash');

exports.getHistory = function(msisdn, type, start, end, successCallback, errorCallback){
    historyService.getCallHistory(msisdn, start, end, function(data){

        successCallback(data);
    }, errorCallback);
};
