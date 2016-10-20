/**
 * Created by razih on 10/13/2016.
 */
packeDataObject = require('../dataObjects/packageDataObject') ;
var PackageStub = [{
    "package_name": "Telebabad 30 Days",
    "package_id": 11,
    "cost": 7.99
},
    {
        "package_name": "Telebabad 7 Days",
        "package_id": 12,
        "cost": 24.99
    },
    {
        "package_name": "Phil Call and Text 30",
        "package_id": 13,
        "cost": 4.99
    },
    {
        "package_name": "Phil Call and Text 65",
        "package_id": 14,
        "cost": 9.99
    },
    {
        "package_name": "Phil Call and Text 100",
        "package_id": 15,
        "cost": 14.99
    },
    {
        "package_name": "Add VOIP number package",
        "package_id": 16,
        "cost": 0.99
    }

];

exports.getCreatedPackage = function(){
  var kandyPackages = PackageStub; // should change with api to kandy

  return kandyPackages.map(function(item){
      return packeDataObject.createFromKandy(item);
  });
};