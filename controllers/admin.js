var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


router.get('/', function(req, res){
	var id = req.params.id;
	if (req.user) {
    db.setting.findAll().then(function(data){
    	console.log("INDEX ID INDEX ID INDEX ID" + id);
		res.render('portal/index');
	});
  } else {
    req.flash('danger','You do not have permission to see this page');
    res.redirect('/');
  }
});

//render settings 
router.get('/settings', function(req, res){
	var id = req.params.id;
	db.setting.findAll().then(function(data){
		if (req.user) {
			res.render('portal/settings');
  		} else {
    		req.flash('danger','You do not have permission to see this page');
    		res.redirect('/');
  		}
  	});
});

router.post('/settings', function(req, res){
	var newEvent = req.body;
	db.setting.findOrCreate({
		where: {
			weddingDate: newEvent.weddingDate,
			location: newEvent.location,
			time: newEvent.time,
			registry: newEvent.registry,
			about: newEvent.about,
			picture: newEvent.picture,
			phone: newEvent.phone,
			email: newEvent.email,
			siteName: newEvent.siteName,
			greeting: newEvent.greeting,
			brideFirst: newEvent.brideFirst,
			brideLast: newEvent.brideLast,
			groomFirst: newEvent.groomFirst,
			groomLast: newEvent.groomLast,
			portalCode: newEvent.portalCode }
		}).spread(function(setting, created){
			db.user.findById(req.user.id).then(function(data){
				data.settingId = setting.id
				data.save().then(function(data){
					res.render('portal/index')
				});
			});
		});
	});
//render tree
router.get('/tree', function(req, res){
	db.setting.findAll().then(function(data){
		if (req.user) {
			res.render('portal/tree');
  		} else {
    		req.flash('danger','You do not have permission to see this page');
    		res.redirect('/');
  		};
  	});
});


//render rsvps
router.get('/rsvplist', function(req, res){
	db.setting.findAll().then(function(data){
		if (req.user) {
			res.render('portal/rsvplist'); //add :id once generating
	  	} else {
	    req.flash('danger','You do not have permission to see this page');
	    res.redirect('/auth/login');
	  };
	});
});

router.get('/site', function(req, res){
	var id = req.params.id;
	db.setting.findAll().then(function(data){
		if (req.user) {
			res.render('portal/site');
  		} else {
    		req.flash('danger','You do not have permission to see this page');
    		res.redirect('/');
  		}
  	});
});




module.exports = router;  // tell node what to export