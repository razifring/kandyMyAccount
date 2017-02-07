'use strict';

var packageEnum = require('../lib/enums/packageEnums');


var categories = {
    phil: 'philipene',
    telebabad: 'telebabad',
};

module.exports = [
    {
        id: 2329,
        title: 'Get US$5 Credit',
        description: 'Call or text any phone worldwide.',
        cost: 4.99,
        type: packageEnum.type.credit,
        purchasable: true,
        hasDid: true,
        mesg:"Thank you for purchasing $5 credits to call or text your loved ones anywhere. Your package will expire on ",
        iosProductId: "juanachat2_1usdcallphbucket"
    },
    {
        id: 2339,
        title: 'Get US$10 Credit',
        description: 'Valid for 30 days',
        cost: 9.99,
        type: packageEnum.type.credit,
        purchasable: true,
        hasDid: true,
        mesg:"Thank you for purchasing $10 credits to call or text your loved ones anywhere. Your package will expire on ",
        iosProductId: "juanachat2_1usdcallphbucket"
    },
    {
        id: 2341,
        title: 'Get US$15 Credit',
        description: 'Valid for 30 days',
        cost: 14.99,
        type: packageEnum.type.credit,
        purchasable: true,
        hasDid: true,
        mesg:"Thank you for purchasing $15 credits to call or text your loved ones anywhere. Your package will expire on ",
        iosProductId: "juanachat2_1usdcallphbucket"
    },
    {
        id: 2233,
        title: 'Telebabad 7 Days',
        description: '1,000 minutes to call PLDT, Smart and Sun numbers, 7 minutes to call other Philippine networks and a Philippine number for 7 days.',
        cost: 7.99,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: true,
        hasDid: true,
        mesg:"Thank you for choosing JuanaChat's 7D Telebabad offer! Call friends and loves ones in the Philippines anytime anyday. Please be guided by the Fair Usage Policy which ensures that all subscribers can enjoy consistent service quality. Learn more about it at htts://juanachat.com/fair-use-policy.html",
        iosProductId: "juanachat2_1usdcallphbucket"
    },
    {
        id: 2234,
        title: 'Telebabad 30 Days',
        description: '4,000 minutes to call PLDT, Smart and Sun numbers, 30 minutes to call other Philippine networks and a Philippine number for 30 days.',
        cost: 24.99,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: true,
        hasDid: true,
        mesg:"Thank you for choosing JuanaChat's 30D Telebabad offer! Call friends and loves ones in the Philippines anytime anyday. Please be guided by the Fair Usage Policy which ensures that all subscribers can enjoy consistent service quality. Learn more about it at https://juanachat.com/fair-use-policy.html"
    },
    {
        id: 2327,
        title: 'Member get Member',
        description: 'Free 6 minutes to call any Philippines number for 24 hours.',
        cost: 0,
        type: packageEnum.type.minutes,
        category: categories.phil,
        purchasable: false,
        hasDid: true,
        mesg:""
    },
    {
        id: 2328,
        title: '6 minutes for 24 hours',
        description: '6 minutes to call any Philippines number for 24 hours.',
        cost: 0.99,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: true,
        voip: 0,
        hasDid: true,
        mesg:"Thank you for purchasing 6 minutes to call any number in the Philippines. Your package will expire on"

    },
    {
        id: 2474,
        title: 'First purchase bonus 15 minutes',
        description: 'First purchase bonus 15 minutes award.',
        cost: 0,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: false,
        voip: 0,
        hasDid: true,
        mesg:""

    },
    {
        id: 2205,
        title: 'Registration bonus',
        description: 'Registration bonus.',
        cost: 0,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: false,
        voip: 0,
        hasDid: true,
        mesg:""

    },
	/*{
	 id: 2231,
	 title: '7 Days VOIP',
	 description: 'Free 7 days Philippines number',
	 cost: 0,
	 type: packageEnum.type.did,
	 purchasable: false,
	 voip:0,
	 hasDid: true
	 },
	 {
	 id: 2232,
	 title: '30 Days VOIP',
	 description: 'Free 30 days Philippines number',
	 cost: 0,
	 type: packageEnum.type.did,
	 purchasable: false,
	 voip:0,
	 hasDid: true
	 }, */// top up cards packages ONLY!!
    {
        id: 2308,
        title: '30 Days VOIP',
        description: '45 minutes to call the Philippines',
        cost: 4.99,
        type: packageEnum.type.minutes,
        purchasable: false,
        voip: 0,
        hasDid: false
    },
    {
        id: 2309,
        title: 'Philippines Call and Text 30',
        description: '30 Minutes to any Philippine Number, 30 SMS to Smart, Talk N Text or Sun Cellular Numbers',
        cost: 'US$4.99',
        type: packageEnum.type.minutes,
        category: categories.phil,
        purchasable: false,
        voip:0
    },
    {
        id: 2310,
        title: 'Philippines Call and Text 65',
        description: '65 Minutes to any Philippine Number, 65 SMS to Smart, Talk N Text or Sun Cellular Numbers',
        cost: 9.99,
        type: packageEnum.type.minutes,
        category: categories.phil,
        purchasable: false,
        voip:0
    },
    {
        id: 2311,
        title: 'Philippines Call and Text 100',
        description: '100 Minutes to any Philippine Number, 100 SMS to Smart, Talk N Text or Sun Cellular Numbers',
        cost: 14.99,
        type: packageEnum.type.minutes,
        category: categories.phil,
        purchasable: false,
        voip:0
    },
    {
        id: 2224,
        title: 'JuanaChat Plan',
        description: '6 mins. to call the Philippines. Valid for 24Hours.',
        cost: 0.99,
        type: packageEnum.type.phil,
        purchasable: false,
        voip:0
    },
    {
        id: 2222,
        title: '30 Days VOIP',
        description: 'Topup card package',
        cost: 0.99,
        type: packageEnum.type.did,
        purchasable: false,
        voip:0,
        hasDid: true
    },
    {
        id: 2223,
        title: '30 Days VOIP',
        description: 'Topup card package',
        cost: 2.99,
        type: packageEnum.type.did,
        purchasable: false,
        voip:0,
        hasDid: true
    },
    {
        id: 2228,
        title: 'Telebabad Pinas 7 Days',
        description: '1,000 minutes to call PLDT, Smart and Sun numbers, 7 minutes to call other Philippine networks and a Philippine number for 7 days.',
        cost: 7.99,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: false,
        hasDid: true
    },
    {
        id: 2230,
        title: 'Telebabad Pinas 30 Days',
        description: '4,000 minutes to call PLDT, Smart and Sun numbers, 30 minutes to call other Philippine networks and a Philippine number for 30 days.',
        cost: 24.99,
        type: packageEnum.type.minutes,
        category: categories.telebabad,
        purchasable: false,
        hasDid: true

    },


];
