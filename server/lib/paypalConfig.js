/**
 * Created by razih on 10/10/2016.
 */
var paypal = require('paypal-rest-sdk');
var config = require('../config/config');

paypal.configure({
    'mode': config.paypal.mode,
    'client_id': config.paypal.client_id,
    'client_secret': config.paypal.client_secret,
    'headers' : {
        'custom': 'header'
    }
});