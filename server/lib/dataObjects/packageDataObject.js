/**
 * Created by razih on 10/13/2016.
 */



function PackageDataObject(id, name, cost){
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.currency = 'USD';
}

exports.createFromKandy = function (data){
    return new PackageDataObject(data.package_id, data.package_name, data.cost);
};

exports = PackageDataObject;