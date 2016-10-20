'use strict';
var baseUrl =  'http://localhost:3000/';

module.exports = {
    db: 'mongodb://localhost/mean-dev',
    app: {
        name: 'JuanaChat - My Account'
    },
    baseUrl:baseUrl,
    paypal: {
        mode: 'sandbox', // sandbox or live
        client_id: 'AfnZ8hyoRTbjV1Q2WNiQYKv-zylCsnYzMeq8-Pfkeja9EksbYQz9UxKpZo_fC3daaiR_6uIZenaRxQT9',
        client_secret: 'EKizcLZC21r-AI6wmoDVW82TzKvoVwbKvpx7ZZk77Nb-pVzNEzx8jEAgA8GHVZOfS1g_-lf09NNwsYYk',
        getPaypalReturnUrl: function(){
            return baseUrl + 'processing'
        },
        getPaypalCancelUrl: function(){
            return baseUrl + 'myAccount'
        }

    }
};
