/**
 * Created by razih on 10/26/2016.
 */

function ResponseDataObject(status, body){
    this.status = status;
    this.body = body;
}

exports.create = function (status, body){
    return new ResponseDataObject(status, body);
};

exports = ResponseDataObject