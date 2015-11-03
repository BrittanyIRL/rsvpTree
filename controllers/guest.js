var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


//render enter
//guestFirst, guestLast, weddingCode
//searching for portalCode in setting.js
// get portalCode
// post guest name

// router.get('/enter', function(req, res){
	
// 		res.render('guest/enter'); //add :id once generating

// 	//find correct wedding code
// 	//if portalCode matches anyother portal code continue
// 	//add name being inputed to guest list
// });

router.get('/enter', function(req, res){
	var guest = req.body; //form data
	console.log(guest);
	db.setting.find({
		where: {
			portalCode : guest.weddingCode
		},
		include: [ db. guest]
	}).then(function(guest){
		console.log(guest)
		res.render('guest/confirm', { guest : guest })
	});
});

//render confirm
router.get('/confirm', function(req, res){
	res.render('guest/confirm'); //add :id once generating
});

//renter rsvp
router.get('/rsvp', function(req, res){
	res.render('guest/rsvp'); //add :id once generating
});
//render decline
router.get('/decline', function(req, res){
	res.render('guest/decline'); //add :id once generating
});

//render accept
router.get('/accept', function(req, res){
	res.render('guest/accept'); //add :id once generating
});




module.exports = router;  // tell node what to export