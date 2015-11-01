var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
//var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


router.get('/', function(req, res){
	//db.favorite.findAll().then(function(data){
	res.render('portal/index'); //submit data to post /favorites
	//});
});

//render portal home
// router.get('/index', function(req, res){
// 	res.render('index'); //add :id once generating
// });

//render sign up page for admins
router.get('/set-up', function(req, res){
	res.render('portal/set-up'); //add :id once generating
});

//render sign in page for admins
router.get('/log-in', function(req, res){
	res.render('portal/log-in'); //add :id once generating
});

//render settings 
router.get('/settings', function(req, res){
	res.render('portal/settings'); //add :id once generating
});
//render tree
router.get('/tree', function(req, res){
	res.render('portal/tree'); //add :id once generating
});

//render rsvps
router.get('/rsvplist', function(req, res){
	res.render('portal/rsvplist'); //add :id once generating
});




module.exports = router;  // tell node what to export