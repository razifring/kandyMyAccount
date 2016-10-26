'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',

	kandyApi: {
		apiUrl: 'https://api-de.kandy.io/v1.3/domains/',
		domainName: "pldt.com",
		domainApiKey: "DAK9f118cdbb78e47778433be17a4d09357",
		domainApiSecret: "DAS84e18ce6660640f288d50a1ddee235fc"
	}

};
