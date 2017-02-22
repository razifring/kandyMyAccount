/**
 * appleService to handle inapp purchase flow by validating purchases made by the ios app.
 */
var simpleRequest = require('../common/simpleRequest') ;
var kandyRequest = require('../common/kandyRequest') ;
var request = require('request');
var config = require('../../config/config') ;
var _ = require('lodash');

exports.validatePurchase = function(userId, receiptId, isSandbox, successCallback, errorCallback) {
    let receiptIdBase64 = new Buffer(receiptId).toString('base64');
    let data = {"receipt-data":receiptIdBase64};
    let url = getAppleVerifyReceiptUrl(isSandbox);
    console.log(url);
    request.post({
            uri: url,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        },
        function(error, response, body){

            if(error) {
                errorCallback({
                    purchaseStatus: PurchaseStatusEnum.StoreFailure,
                    error: error
                });
                return;
            }

            var jsonBody = '';
            try {
                jsonBody = JSON.parse(body);
            } catch (jsonParserError) {
                errorCallback({
                    purchaseStatus: PurchaseStatusEnum.StoreFailure,
                    error: 'Json response is not valid.'
                });
                return;
            }

            let responseStatus = _.get(jsonBody, 'status', -1);
            if (responseStatus === 0) {
                let responseReceipt = _.get(jsonBody, 'receipt');
                if (checkFraud(responseReceipt)) {
                    errorCallback({
                        purchaseStatus: PurchaseStatusEnum.StoreFailure,
                        error: 'Fraud by user.'
                    });
                    return;
                }

                let receiptUniqueId = _.get(responseReceipt,'original_purchase_date') + '_' + _.get(responseReceipt,'original_transaction_id');
                successCallback({
                    receiptUniqueId: receiptUniqueId,
                    purchaseStatus: PurchaseStatusEnum.Done
                });
            } else {
                let err = getErrorMsg(responseStatus);
                errorCallback({
                    purchaseStatus: PurchaseStatusEnum.RejectedByStore,
                    error: err
                });
            }
        });
};

function getAppleVerifyReceiptUrl(isSandbox){
    let appleVerifyReceiptURL = 'https://buy.itunes.apple.com/verifyReceipt';
    if(isSandbox)
    {
        appleVerifyReceiptURL = 'https://sandbox.itunes.apple.com/verifyReceipt';
    }

    return appleVerifyReceiptURL;
}

function checkFraud(responseReceipt) {
    return '170000029449420' == responseReceipt.original_transaction_id;
}

function getErrorMsg(responseStatus) {
    let err = "Unknown error";
    switch(responseStatus)
    {
        case 21000:
            err = "The App Store could not read the JSON object you provided.";
            break;
        case 21002:
            err = "The data in the receipt-data property was malformed or missing.";
            break;
        case 21003:
            err = "The receipt could not be authenticated.";
            break;
        case 21004:
            err = "The shared secret you provided does not match the shared secret on file for your account (autoRenewable subscription).";
            break;
        case 21005:
            err = "The receipt server is not currently available.";
            break;
        case 21006:
            err = "This receipt is valid but the subscription has expired. When this status code is returned to your server, the receipt data is also decoded and returned as part of the response (autoRenewable subscription).";
            break;
        case 21007:
            err = 'This receipt is from the test environment, but it was sent to the production environment for verification.';
            break;
        case 21008:
            err = "This receipt is from the production environment, but it was sent to the test environment for verification. Send it to the production environment instead.";
            break;
        default:
    }

    return err;
}

PurchaseStatusEnum = {
    None: 0,
    Done: 1,
    AlreadyDone: 2,
    InProcess: 3,
    StoreFailure: 4,
    SystemFailure: 5,
    RejectedByStore: 6,
    RejectedBySystem: 7,
    FraudDetected: 8,
    OriginalTransactionIdExists: 9
};


