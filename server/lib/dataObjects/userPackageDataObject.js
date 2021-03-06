/**
 * Created by razih on 10/13/2016.
 */
var packageManager = require('../managers/packageManager');


function PackageDataObject(id, name, balance, remainingMinutes, startTime, endTime, type){
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.remainingMinutes = remainingMinutes;
    this.startTime = startTime;
    this.endTime = endTime;
    this.type = type;
    this.currency = 'USD';
}

exports.createFromKandy = function (data, packageId){
    let name = packageManager.getPackageConfigById(packageId).title;
    return new PackageDataObject(packageId, name, data.balance, data.remaining_minutes, data.start_timestamp, data.end_timestamp, data.package_type);
};

exports = PackageDataObject;