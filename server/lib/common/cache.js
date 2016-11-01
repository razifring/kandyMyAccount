/**
 * Created by razih on 10/25/2016.
 */
const NodeCache = require( "node-cache" );


var cacheObj;
/**
 *
 * @returns NodeCache
 */
exports.getCache = function(){
    if(!cacheObj)
    {
        cacheObj = new NodeCache();
    }

    return cacheObj;
};

exports.getDomainToken = function(){
    let cache = this.getCache();
    try{
        return cache.get('domainToken', true);
    } catch(err){
        console.log(err);
        return false;
    }
};

exports.setDomainToken = function(token){
    let cache = this.getCache();
    cache.set('domainToken', token);
    return this;
};