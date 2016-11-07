'use strict';

var packageEnum = require('../lib/enums/packageEnums');


var categories = {
	phil: 'philipene',
	telebabad: 'telebabad',
};

module.exports = [
	{
		id: 1374,
		title: 'Get US$5 Credit',
		description: 'Valid for 30 days',
		cost: 'US$4.99',
		type: packageEnum.type.credit,
	},
	{
		id: 1375,
		title: 'Get US$10 Credit',
		description: 'Valid for 30 days',
		cost: 'US$9.99',
		type: packageEnum.type.credit,
	},
	{
		id: 1376,
		title: 'Get US$15 Credit',
		description: 'Valid for 30 days',
		cost: 'US$14.99',
		type: packageEnum.type.credit
	},
	{
		id: 1377,
		title: 'Telebabad Pinas 7 Days ',
		description: '1,000 minutes to call PLDT, Smart and Sun numbers, 7 minutes to call other Philippine networks and a Philippine number for 7 days.',
		cost: 'US$7.99',
		type: packageEnum.type.minutes,
		category: categories.telebabad
	},
	{
		id: 1378,
		title: 'Telebabad Pinas 30 Days',
		description: '4,000 minutes to call PLDT, Smart and Sun numbers, 30 minutes to call other Philippine networks and a Philippine number for 30 days.',
		cost: 'US$24.99',
		type: packageEnum.type.minutes,
		category: categories.telebabad,

	},
	{
		id: 1379,
		title: 'Philippines Call and Text 30',
		description: '30 Minutes to any Philippine Number, 30 SMS to Smart, Talk N Text or Sun Cellular Numbers',
		cost: 'US$4.99',
		type: packageEnum.type.minutes,
		category: categories.phil,
	},
	{
		id: 1380,
		title: 'Philippines Call and Text 65',
		description: '65 Minutes to any Philippine Number, 65 SMS to Smart, Talk N Text or Sun Cellular Numbers',
		cost: 'US$9.99',
		type: packageEnum.type.minutes,
		category: categories.phil,
	},
	{
		id: 1381,
		title: 'Philippines Call and Text 100',
		description: '100 Minutes to any Philippine Number, 100 SMS to Smart, Talk N Text or Sun Cellular Numbers',
		cost: 'US$14.99',
		type: packageEnum.type.minutes,
		category: categories.phil,
	},
	{
		id: 1456,
		title: 'Add VOIP number package, $0.99 USD',
		description: '',
		cost: 'US$0.99',
		type: packageEnum.type.did,
	},




];
