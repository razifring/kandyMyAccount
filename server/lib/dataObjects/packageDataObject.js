/**
 * Created by razih on 10/13/2016.
 */



function PackageDataObject(id, name, title, cost){
    this.id = id;
    this.title = title;
    this.name = name;
    this.cost = cost;
    this.currency = 'USD';
}

/**
 *
 * @param data - data from packageConfig
 * @param name - package name
 * @returns {PackageDataObject}
 */
exports.createFromPackagesConfig = function (data, name){
    return new PackageDataObject(data.id, name, data.title, data.cost);
};

exports = PackageDataObject;