/**
 * Created by razih on 10/13/2016.
 */



function PackageDataObject(id, name, title, cost, type, voip, hasDid, mesg, iosProductId){
    this.id = id;
    this.title = title;
    this.name = name;
    this.cost = cost;
    this.currency = 'USD';
    this.type = type;
    this.voip = voip;
    this.hasDid = hasDid;
    this.mesg = mesg;
    this.iosProductId = iosProductId;
}

/**
 *
 * @param data - data from packageConfig
 * @param name - package name
 * @returns {PackageDataObject}
 */
exports.createFromPackagesConfig = function (data, name){
    return new PackageDataObject(data.id, name, data.title, data.cost, data.type, data.voip, data.hasDid, data.mesg, data.iosProductId);
};

exports = PackageDataObject;