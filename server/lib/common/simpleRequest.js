/**
 *  # Simple request module
 *  This module simplifies the 'request' module even more by implementing a common response handling code which usually is rewritten in every 'request' using node.
 *  @module Simple request
 *  @class Simple request
 */

/*!
 * Module dependencies.
 */

require('http').globalAgent.maxSockets = Infinity;
var request = require('request');


/*****************************************************************
 /* postJson
 /*
 /* Sends a post request with body in JSON format.
 /*
 /*
 /* In param:
 /*		url -		The URL to send to.
 /*		payload -	The payload to send in JSON format (expects a
 /*					JSON object).
 /* Out param:
 /*      Callback function with error parameter (null on success)
 /*		and the body of the response (in case of
 /*		success).
 ******************************************************************/
/**
 * @method postJson
 * @param {string} url
 * @param {json} payload
 * @param {object} cb
 * @return {error / json}
 */
function postJson(url, payload, cb) {

    try {
        request.post({
            uri: url,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload)
        }, function(error, response, body) {

            if (error || response.statusCode != 200)
            {
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                cb(err_msg);
                return;
            }

            cb(null, body);
        });
    }
    catch (e) {
        logger.error("Exception caught handling post request to URL: " + url + "\nThe exception: " + e);
        cb(e);
    }

}

/*****************************************************************
 /* postUrlEncoded
 /*
 /* Sends a post request with body in URL-Encoded format.
 /*
 /*
 /* In param:
 /*		url -		The URL to send to.
 /*		payload -	The payload to send in URL-Encoded format
 /*					(string).
 /* Out param:
 /*      Callback function with error parameter (null on success)
 /*		and the body of the response (in case of
 /*		success).
 ******************************************************************/
/**
 * @method postUrlEncoded
 * @param {string} url
 * @param {string} payload
 * @param {object} cb
 * @return {error / json}
 */
function postUrlEncoded(url, payload, successCallback, errorCallback) {

    try {
        request.post({
            uri: url,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: payload
        }, function(error, response, body) {

            if (error || response.statusCode != 200)
            {
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                errorCallback(err_msg);
                return;
            }

            successCallback(body);
        });
    }
    catch (e) {
        errorCallback(e);
    }

}

/*****************************************************************
 /* postTextHtml
 /*
 /* Sends a post request with body in text/html format.
 /*
 /*
 /* In param:
 /*		url -		The URL to send to.
 /*		payload -	The payload to send in text/html format
 /*					(string).
 /* Out param:
 /*      Callback function with error parameter (null on success)
 /*		and the body of the response (in case of
 /*		success).
 ******************************************************************/
/**
 * @method postTextHtml
 * @param {string} url
 * @param {string} payload
 * @param {object} cb
 * @return {error / json}
 */
function postTextHtml(url, payload, cb) {

    try {
        request.post({
            uri: url,
            headers: { 'Content-Type': 'text/html', 'Accept': 'text/html', 'Accept-Encoding': 'text/html' },
            body: payload
        }, function(error, response, body) {

            if (error || response.statusCode != 200)
            {
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                logger.error("URL: %s returned an error for post request. Error message: %s, error object: %j", url, err_msg, error);
                cb(err_msg);
                return;
            }

            logger.info("Successfully sent post request to URL: " + url);
            logger.debug ("data: %j", payload);
            logger.debug ("results: %s", body);
            cb(null, body);
        });
    }
    catch (e) {
        logger.error("Exception caught handling post request to URL: " + url + "\nThe exception: " + e);
        cb(e);
    }

}

/*****************************************************************
 /* post
 /*
 /* Sends a post request.
 /*
 /*
 /* In param:
 /*		url -		The URL to send to.
 /*		payload -	The payload to send in text/html format
 /*					(string).
 /*		headers -	The headers associated with the post request.
 /* Out param:
 /*      Callback function with error parameter (null on success)
 /*		and the body of the response (in case of
 /*		success).
 ******************************************************************/
/**
 * @method post
 * @param {string} url
 * @param {string} payload
 * @param {string} headers
 * @param successCallback
 * @param errorCallback
 * @return {error / json}
 */
function post(url, payload, headers, successCallback, errorCallback) {

    try {
        request.post({
            uri: url,
            headers: headers,
            body: payload
        }, function(error, response, body) {

            if (error || response.statusCode != 200)
            {
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                errorCallback({message: err_msg, code: response.statusCode});
                return;
            }

            successCallback(body);
        });
    }
    catch (e) {
        errorCallback(e);
    }

}

/**
 * @method post
 * @param {string} url
 * @param {string} payload
 * @param {string} headers
 * @param successCallback
 * @param errorCallback
 * @return {error / json}
 */
function put(url, payload, headers, successCallback, errorCallback) {

    try {
        request.put({
            uri: url,
            headers: headers,
            body: payload
        }, function(error, response, body) {

            if (error || response.statusCode != 200)
            {
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                errorCallback({message: err_msg, code: response.statusCode});
                return;
            }
            console.log('simpleRequestSucees');
            successCallback(body);
        });
    }
    catch (e) {
        errorCallback(e);
    }

}

/*****************************************************************
 /* get
 /*
 /* Sends a get request.
 /*
 /*
 /* In param:
 /*		url -		The URL to send to, with parameters chained to
 /*					it.
 /* Out param:
 /*      Callback function with error parameter (null on success)
 /*		and the body of the response (in case of
 /*		success).
 ******************************************************************/
/**
 * @method get
 * @param {string} url
 * @param successCallback
 * @param errorCallback
 * @return {error / json}
 */
function get(url, successCallback, errorCallback) {

    try {
        request.get(url, function(error, response, body) {
            if (error || response.statusCode != 200)
            {
                console.log(response.statusCode);
                console.log(response.body);
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                if(errorCallback)
                {
                    errorCallback({message: err_msg, code: response.statusCode});
                }
                return;
            }
            successCallback(JSON.parse(body));
        });
    }
    catch (e) {
        errorCallback(e);
    }

}


/*****************************************************************
 /* deleteUrlEncoded
 /*
 /* Sends a delete request with body in URL-Encoded format.
 /*
 /*
 /* In param:
 /*		url -		The URL to send to.
 /*		payload -	The payload to send in URL-Encoded format
 /*					(string).
 /* Out param:
 /*      Callback function with error parameter (null on success)
 /*		and the body of the response (in case of
 /*		success).
 ******************************************************************/
/**
 * @method deleteUrlEncoded
 * @param {string} url
 * @param {string} payload
 * @param {object} cb
 * @return {error / json}
 */
function deleteUrlEncoded(url, payload, cb) {

    try {
        request.del({
            uri: url,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: payload
        }, function(error, response, body) {

            if (error || response.statusCode != 200)
            {
                var err_msg = (error && error.message ) ? error.message : "(no specific error object, http return code: " + response.statusCode + ")";
                logger.error("URL: %s returned an error for post request. Error message: %s, error object: %j", url, err_msg, error);
                cb(err_msg);
                return;
            }

            logger.info("Successfully sent post request to URL: " + url);
            logger.debug ("data: %j", payload);
            logger.debug ("results: %s", body);
            cb(null, body);
        });
    }
    catch (e) {
        logger.error("Exception caught handling post request to URL: " + url + "\nThe exception: " + e);
        cb(e);
    }

}


exports.postJson = postJson;
exports.postUrlEncoded = postUrlEncoded;
exports.postTextHtml = postTextHtml;
exports.post = post;
exports.put= put;
exports.get = get;
exports.deleteUrlEncoded = deleteUrlEncoded;