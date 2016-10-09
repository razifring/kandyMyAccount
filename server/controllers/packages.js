'use strict';

/**
 * List of Pakcages
 */
exports.getUserPackages = function(req, res) {
    console.log(req.params);
    var packages = [{
        'id': 11,
        'name': 'Telebabad 30 Days',
        'usage': '4030 minutes left ',
        'expire': '2016-09-16'
    },{
        'id': 12,
        'name': 'Telebabad 7 Days',
        'usage': '1007 minutes left',
        'expire': '2016-10-16'
    },
        {
            'id': 13,
            'name': 'Telebabad 5 Days',
            'usage': '1227 minutes left',
            'expire': '2016-05-16'
        }
    ];

    res.json(packages);
};

exports.getPurchasable = function(req, res) {
    console.log(req.params);
    var packages = {
        callPlans: [{
            'id': 11,
            'name': 'Telebabad 30 Days',
            'price': '5',
            'currency': 'USD'
        },{
            'id': 12,
            'name': 'Telebabad 7 Days',
            'price': '5',
            'currency': 'USD'
        },
            {
                'id': 13,
                'name': 'Telebabad 5 Days',
                'price': '5',
                'currency': 'USD'
            }
        ],
        didPlans: [
            {
                'id': 11,
                'name': 'VOIP number package',
                'price': '2.99',
                'currency': 'USD'
            }
        ]
    };

    res.json(packages);
};
