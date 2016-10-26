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
    console.log('indide get cache function');
    if(!cacheObj)
    {
        cacheObj = new NodeCache();
    }

    return cacheObj;
};

exports.getDomainToken = function(){
    console.log('indide getDomainToken');
    let cache = this.getCache();
    try{
        console.log('my keys are: ' + cache.keys());
        return cache.get('domainToken', true);
    } catch(err){
        console.log(err);
        return false;
    }
};

exports.setDomainToken = function(token){
    let cache = this.getCache();
    console.log('set domain token: ' + token);
    cache.set('domainToken', token);
    return this;
};