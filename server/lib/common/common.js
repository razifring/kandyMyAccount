/**
 * Created by razih on 10/27/2016.
 */

exports.requireLogin = function(){
    if (!req.userId) {
        res.send(401, 'User is not authorized');
    } else {
        next();
    }
};