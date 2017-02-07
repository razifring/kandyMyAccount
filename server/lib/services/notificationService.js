var request = require('request');
var config = require('../../config/config');
var tokenManager = require('../managers/tokenManager');

exports.test = function(){
    request('https://api-de.kandy.io/v1.3/domains/billing/packages/created?key=DAT015f805002cc43b9b9d9a285b8a8c499', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            console.log('notification service');
        }
    });
}

exports.chat_notification = function(user_msisdn, message){
    tokenManager.getDomainAccessToken(function(dat_token){
        // console.log('here is the DAT token = ' + dat_token);
        var user = 'juanachat';
        tokenManager.getStickerUserAccessToken(user,
            function(uat_token){

              //  var token = 'UAT7cf033f4af234fe7afccdc05947dfdd8'; // juanachat sender UAT
                console.log('here is the UAT token = ' + uat_token);
                request({
                    url: config.kandyApi.apiUrl + 'provision/users/user?key=' + dat_token +'&user_id=' + user_msisdn,
                    method: 'GET',
                    json: {}
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var user_device_id = body.result.last_registered_device_id;
                        // console.log(user_device_id);

                        var requestData = {
                            "message": {
                                "messageType": "chat",
                                "contentType": "text",
                                "destination": user_msisdn + "@pldt.com",
                                "UUID": generateRandomString(64),
                                "message": {
                                    "mimeType": "text/plain",
                                    "text": message
                                }
                            }
                        };

                        request({
                            url: 'https://api-de.kandy.io/v1.3/devices/messages?key=' + uat_token + '&device_id=' + user_device_id,
                            method: 'POST',
                            json: requestData
                        }, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                // console.log(body);
                                console.log('chat message sent to ' + user_msisdn + ' | message = ' + message);
                            }
                        });
                    } else {
                        console.log('provisioned user error');
                    }
                });
            },
            function(e){
                res.json(responseDataObject.create(false, e));
            }
        );
    });
};

exports.text_notification = function(){
    var requestData = {
        "message": {
            "source":"639271666952",
            "destination":"639271666952",
            "message":{
                "text": "this is an SMS!"
            }
        }
    }

    request({
        url: 'https://api-de.kandy.io/v1.3/devices/smss?key=UAT2f8e4977897842dba844c1756a1fb3b6&device_id=0463a1fee50d1b2',
        method: 'POST',
        json: requestData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.message);
            console.log('text notification service');
        }
    });
};

exports.get_dat_token = function() {
    tokenManager.getDomainAccessToken(function(token){
        console.log('here is the DAT token = ' + token);
    });
};

exports.get_uat_token = function(user_msisdn) {
    tokenManager.getStickerUserAccessToken(user_msisdn,
        function(token){
            // res.json(data);
            console.log('here is the UAT token = ' + token);
        },
        function(e){
            res.json(responseDataObject.create(false, e));
        }
    );
};

exports.get_provisioned_user = function(user_msisdn) {
    request({
        url: 'https://api-de.kandy.io/v1.3/domains/provision/users/user?key=DAT015f805002cc43b9b9d9a285b8a8c499&user_id=' + user_msisdn,
        method: 'GET',
        json: {}
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('get provisioned user');
            console.log(body);
            console.log(body.result.last_registered_device_id);
            console.log('kandy url = ' + config.kandyApi.apiUrl);
        }
    });
};

function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}