/**
 * Created by razih on 10/13/2016.
 */
var packageManager = require('../managers/packageManager');


function PackageDataObject(id, name, balance, remainingMinutes, startTime, endTime, type, hasDid){
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.remainingMinutes = remainingMinutes;
    this.startTime = startTime;
    this.endTime = endTime;
    this.type = type;
    this.hasDid = hasDid;
    this.currency = 'USD';
}

/**
 *
 * @param data
 * @param packageId
 * @returns PackageDataObject | null
 */
exports.createFromKandy = function (data, packageId){
    let packageConfigData = packageManager.getPackageConfigById(packageId);
    if(packageConfigData) {
        return new PackageDataObject(packageId, packageConfigData.title, data.balance, data.remaining_minutes, data.start_timestamp, data.end_timestamp, packageConfigData.type, packageConfigData.hasDid);
    } else {
        return null;
    }
};

exports = PackageDataObject;