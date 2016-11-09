'use strict';

var hisotryManager = require('../lib/managers/hisotryManager');
var responseDataObject = require('../lib/dataObjects/responseDataObject');

/**
 * Get history
 */
exports.getHistory = function(req, res) {

    console.log(req.params);
    console.log(req.userId);
    if(req.params.msisdn !== req.userId) {
        res.json(responseDataObject.create(false, {}));
        return;
    }

    console.log(req.params.type);
    console.log(req.params.start);
    console.log(req.params.end);

    hisotryManager.getHistory(req.userId, req.params.type, req.params.start, req.params.end,
        function(history){
            res.json(responseDataObject.create(true, {
                history: history
            }));
        },
        function(e){
            console.log(e.toString());
            res.json(responseDataObject.create(false, e));
        }
    );
};

