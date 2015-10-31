var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
//var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


//render portal home
router.get('/portal/index', function(req, res){
	res.render('portal/index'); //add :id once generating
});

// //render sign up page for admins
router.get('/portal/set-up', function(req, res){
	res.render('portal/set-up'); //add :id once generating
});

//render sign in page for admins
router.get('/portal/log-in', function(req, res){
	res.render('portal/log-in'); //add :id once generating
});

//render settings 
router.get('/portal/settings', function(req, res){
	res.render('portal/settings'); //add :id once generating
});
//render tree
router.get('/portal/tree', function(req, res){
	res.render('portal/tree'); //add :id once generating
});

//render rsvps
router.get('/portal/rsvplist', function(req, res){
	res.render('portal/rsvplist'); //add :id once generating
});




module.exports = router;  // tell node what to export