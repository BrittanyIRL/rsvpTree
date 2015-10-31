var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
//var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


//render enter
router.get('/guest/enter', function(req, res){
	res.render('guest/enter'); //add :id once generating
});

//render confirm
router.get('/guest/confirm', function(req, res){
	res.render('guest/confirm'); //add :id once generating
});

//renter rsvp
router.get('/guest/rsvp', function(req, res){
	res.render('guest/rsvp'); //add :id once generating
});
//render decline
router.get('/guest/decline', function(req, res){
	res.render('guest/decline'); //add :id once generating
});

//render accept
router.get('/guest/accept', function(req, res){
	res.render('guest/accept'); //add :id once generating
});




module.exports = router;  // tell node what to export