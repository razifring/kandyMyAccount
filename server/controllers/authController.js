'use strict';

/**
 * login
 */
exports.login = function(req, res) {
    console.log(req.body);

    var token = {
        token: 'fake-jwt-token'
    };

    res.json(token);
};

exports.sendOtp = function(req, res){
    var out =  {
        otp: true
    };

    /*
     var res =  {
        err: 'errror'
    }

     */
    res.json(out);
};
