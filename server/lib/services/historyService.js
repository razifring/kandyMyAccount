/**
 * Created by razih on 10/13/2016.
 */
var config = require('../../config/config');
var kandyRequest = require('../common/kandyRequest') ;

exports.getCallHistory = function(userId, start, end, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'billing/users/history/calls/?user_id=' + userId +
        '&start_time=' + start +
        '&end_time=' + end;
    kandyRequest.get(url, function(data){
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};

exports.getSmsHistory = function(userId, start, end, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'billing/users/history/smss/?user_id=' + userId +
        '&start_time=' + start +
        '&end_time=' + end;
    kandyRequest.get(url, function(data){
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};


exports.getPackagesHistory = function(userId, start, end, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'billing/users/history/packages/?user_id=' + userId +
        '&start_time=' + start +
        '&end_time=' + end;
    kandyRequest.get(url, function(data){
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};