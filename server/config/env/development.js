'use strict';
var baseUrl =  'http://localhost:3000/';
//var apiCache = require('apicache');
//apiCache.options({ debug: true });

module.exports = {

    baseUrl:baseUrl,
    port: 3000,
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

    },
    kandyApi: {
        // apiUrl: 'https://api-de.kandy.io/v1.3/domains/',
        apiUrl: 'https://api-de.kandy.io/prp/v1.3/domains/',
        domainName: "pldt.com",
        domainApiKey: "DAK9f118cdbb78e47778433be17a4d09357",
        domainApiSecret: "DAS84e18ce6660640f288d50a1ddee235fc"
    }
};
