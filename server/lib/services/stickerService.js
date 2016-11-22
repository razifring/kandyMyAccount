/**
 * Created by razih on 10/13/2016.
 */
var config = require('../../config/config');
var kandyRequest = require('../common/kandyRequest') ;

exports.assignSticker = function(stickerId, userId, successCallback, errorCallback){
    var url = config.kandyApi.apiUrl + 'users/contents/collections';
    let params = {
        user_id: userId,
        collection_id: stickerId
    };

    kandyRequest.post(url, params, function(data){
        kandyRequest.successCallback(data, successCallback, errorCallback);
    },errorCallback);
};
