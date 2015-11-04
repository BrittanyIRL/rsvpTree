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
	var id = req.params.id; //find a way to get this to equate the right setting table 
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
			res.render('guest/two' + weddingId);
		});
	});

// Second Page: Is this the right wedding?
//     — On no redirect to which wedding?
// //     — On yes - great, who are you?
router.get('/two/', function(req, res){
	req.session.weddingCode = req.query.weddingCode; // this should be the setting id selected in /one
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
			portalCode: req.session.weddingCode
		},
		include: [ db.guest ]
	}).then(function(guest){
		//confirm that this is the right page
		//if yes, proceed
		//if no then back to one
		res.render('guest/three', { setting : setting, guest : guest })
	});
});	

router.get('/three', function(req, res){
	db.guest.find({
	where: {
		portalCode: req.session.weddingCode
	}
}).then(function(guest){
	res.render('guest/three', { guest : guest })
});
});

router.post('/three', function(req, res){
	db.guest.findOrCreate(
	{
		where: {
			portalCode: req.session.weddingCode,
			firstName: guestFirst,
			lastName: guestLast
		}
	}).spread(function(rsvp, created){
		newRsvp.addGuest(rsvp).then(function(){
			res.render('guest/four', { rsvp : rsvp })
		})
	});
});
// //at this point, the portalCode will have been stored so we only need guest db
// // Third Page: Who are you & can you come?
// //     — On no, redirect to thanks for RSVPing, hopefully we’ll see you soon.
// //     — On yes, great! You can make it, please fill out form.

// Fourth Page: Form to fill out with guest details.


// Fifth Page: Awesome! We’ll see you on the Xth. Displays details.





module.exports = router;  // tell node what to export



