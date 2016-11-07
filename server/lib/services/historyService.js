/**
 * Created by razih on 10/13/2016.
 */
var config = require('../../config/config');
var kandyRequest = require('../common/kandyRequest') ;

exports.getCallHistory = function(userId, start, end, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'billing/users/hisotry/calls/?user_id=' + userId +
        '&start_time=' + start +
        '&end_time=' + end;
    kandyRequest.get(url, function(data){
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};

