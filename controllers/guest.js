var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


//store session code
var rsvpToken = null;


// First Page: Hi what wedding would you like to RSVP to?
//     — Lookup wedding & display confirmation page.
router.get('/one', function(req, res){
	db.setting.findAll().then(function(data){
		res.render('guest/one')
	})
});

router.post('/one', function(req, res){ 
	var weddingId = req.body.weddingCode;
	//search and find matching id to proceed.
	db.setting.find({
		where: {
			portalCode: weddingId
		},
		include:[ db.guest ]
		}).then(function(setting){
			res.render('guest/two' + weddingId, { setting : setting });
		});
});

// Second Page: Is this the right wedding?
router.get('/two/', function(req, res){
	req.session.weddingCode = req.query.weddingCode; // this should be the setting id selected in /one
	rsvpToken = req.session.weddingCode; // push token for session to globel level
	//load setting db to confirm right party 
	db.setting.find({
	where: {
		portalCode: req.session.weddingCode
	 	}
	 }).then(function(setting){
		res.render('guest/two', { setting : setting })
	});
});

router.post('/two', function(req, res){
	db.setting.find({
		where: {
			portalCode: rsvpToken
		},
		include: [ db.guest ]
	}).then(function(guest){
		res.render('guest/three' + req.query.weddingCode, { setting : setting, guest : guest })
	});
});	

router.get('/three/', function(req, res){
	db.setting.find({
	where: {
		portalCode: rsvpToken
	},
	include:[ db.guest ]
}).then(function(setting){
	res.render('guest/three', { setting : setting })
});
});

 // Third Page: Who are you & can you come?
router.post('/three', function(req, res){
	var newGuest = req.body;
	db.setting.find({
		where: {
			portalCode: rsvpToken
		},
		include: [ db.guest ]
	}).then(function(setting){
		db.guest.create({
			firstName: (req.body.firstName ? req.body.firstName : null),
			lastName: (req.body.lastName ? req.body.lastName : null),
			rsvp: (req.body.rsvp ? req.body.rsvp : false),
			portalCode: rsvpToken,
			email: (req.body.email ? req.body.email : null),
			diet: (req.body.diet ? req.body.diet : null),
			party: (req.body.party ? req.body.diet : null),
			childAge: (req.body.childAge ? req.body.childAge : null),
			childName: (req.body.childName ? req.body.childName : null),
			count: (req.body.count ? req.body.count : 0 ),
			plusOneLastName: (req.body.plusOneLastName ? req.body.plusOneLastName : null),
			plusOneFirstName: (req.body.plusOneFirstName ? req.body.plusOneFirstName : null)
		 }).then(function(guest){
			res.render('guest/four', { setting : setting, guest : guest })
		});	
	});		
})
// Fourth Page: Awesome! We’ll see you on the Xth. Displays details.

router.get('/four', function(req, res){
	console.log("THIS IS ROUTE POST FOUR HERE I AM NOTICE ME " + rsvpToken);
	db.setting.find({
	where: {
		portalCode: rsvpToken
	},
	include:[ db.guest ]
	}).then(function(setting){
		res.render('guest/four', { setting : setting, guest : guest })
	});
});

router.post('/four', function(req, res){
	db.setting.find({
		where: {
			portalCode: rsvpToken
		},
		include:[ db.guest ]
	}).then(function(setting){
		res.render('guest/info', {setting : setting, guest : guest })
	});
});

//this is the viewable page for guests 
router.get('/info', function(req, res){
	db.setting.find({
		where: {
			portalCode: req.session.weddingCode
		},
		include: [ db.guest ]
	}).then(function(setting){
		console.log("CONSOLE LOG AT END HERE I AM FIND ME WITH THE ALL CAPS" + req.session.weddingCode)
		res.render('guest/info', { setting : setting })
	});
});

module.exports = router;  // tell node what to export



