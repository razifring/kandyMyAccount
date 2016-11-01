/**
 * Created by razih on 11/1/2016.
 */
var config = require('../../config/config') ;

exports.setSession = function(userId){

    var accessToken = cacheManager.getDomainToken();
    if(!accessToken)
    {
        this.renewDomainAccessToken(successCallback)
    }
    else
    {
        successCallback(accessToken);
    }
};
