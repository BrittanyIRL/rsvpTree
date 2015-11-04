var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));

// First Page: Hi what wedding would you like to RSVP to?
//     — Lookup wedding & display confirmation page.

//load setting model info to be looked up on button submit
router.get('/one', function(req, res){
	db.setting.findAll().then(function(data){
		res.render('guest/one')
	})
});

router.post('/one', function(req, res){ 
//find a way to get this to equate the right setting table 
	var weddingId = req.body.weddingCode;
	//search and find matching id to proceed.
	//carry this over 
	db.setting.find({
		where: {
			portalCode: weddingId
		},
		include:[ db.guest ]
		}).then(function(setting){
			console.log(setting.get())
			res.render('guest/two' + weddingId, { setting : setting });
		});
	});

// Second Page: Is this the right wedding?
//     — On no redirect to which wedding?
// //     — On yes - great, who are you?
var rsvpToken = null;
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
	})
})

router.post('/two', function(req, res){
	db.setting.find({
		where: {
			portalCode: rsvpToken
		},
		include: [ db.guest ]
	}).then(function(guest){
		//confirm that this is the right page
		//if yes, proceed
		//if no then back to one
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
// //     — On no, redirect to thanks for RSVPing, hopefully we’ll see you soon.
// //     — On yes, great! You can make it, please fill out form.
var newGuestFirst = null;
var newGuestLast = null;
router.post('/three', function(req, res){
	var newGuest = req.body;
	newGuestFirst = req.session.firstName;
	newGuestLast = req.session.lastName;
	console.log(rsvpToken);

	db.setting.find({
		where: {
			portalCode: rsvpToken //this is showing as null
		},
		include:[ db.guest ]
	}).then(function(guest){
		db.guest.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			rsvp: req.body.rsvp,
			portalCode: rsvpToken
		}).catch(function(error){
			res.render('error');
		}).then(function(guest){
			res.render('guest/four', { guest : guest })
		});
		
	});
});

router.get('/four', function(req, res){
	console.log("WE ARE TRACKING GUEST NAME NOW" + newGuestFirst);
	var newGuest = req.body;
	db.guest.find({
		where: {
			firstName: newGuestFirst,
			lastName: newGuestLast
		}
	}).then(function(guest){
		guest.diet = newGuest.diet;
		guest.party = newGuest.party;
		guest.childAge = newGuest.childAge;
		guest.childName = newGuest.childName;
		guest.count = newGuest.count;
		guest.plusOneLastName = newGuest.plusOneLastName;
		guest.plusOneFirstName = newGuest.plusOneFirstName;
		guest.email = newGuest.email;
		guest.save().then(function(){
			res.render('guest/four', { guest : guest })
		});
	});
});

router.post('/four', function(req, res){

});
// //at this point, the portalCode will have been stored so we only need guest db
// // Third Page: Who are you & can you come?
// //     — On no, redirect to thanks for RSVPing, hopefully we’ll see you soon.
// //     — On yes, great! You can make it, please fill out form.

// Fourth Page: Form to fill out with guest details.


// Fifth Page: Awesome! We’ll see you on the Xth. Displays details.





module.exports = router;  // tell node what to export



