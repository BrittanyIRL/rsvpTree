var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));


router.get('/', function(req, res){
	console.log(req.user.id)
	db.user.findById(req.user.id).then(function(data){
		user.getSettings().then(function(setting){
			res.render('portal/index', { user : user, setting : setting})
		})
	});
});

//render settings 
router.get('/settings', function(req, res){
	// var id = req.user.id;
	db.setting.findAll().then(function(setting){
		if (req.user) {
			res.render('portal/settings', { setting : setting });
  		} else {
    		req.flash('danger','You do not have permission to see this page');
    		res.redirect('/');
  		}
  	});
});
var sessionUser = null; 

router.post('/settings', function(req, res){
	req.session.userId = req.user.id
	console.log(sessionUser + "SETTING SESSION USER")
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
	console.log(req.user.settingId);
	db.setting.find({
		where: {
			id: req.user.settingId
		},
		include: [ db.guest ],
		include: [ db.user ],
	}).then(function(setting){
			//if (req.user) {
		res.render('portal/tree', { setting : setting, user : user, guest : guest});
	  		//} else {
	    	//	req.flash('danger','You do not have permission to see this page');
	    	//	res.redirect('/');
	  		//};
	  	});
	})



//render rsvps
router.get('/rsvplist', function(req, res){
	console.log(req.user.id + "TEST")
	db.user.findById(req.user.id).then(function(user){
		db.setting.find({
			where: {
				id: req.user.settingId
			},
			include: [ db.guest ]
		}).then(function(user){
			if (req.user) {
				res.render('portal/rsvplist', { setting : setting, user : user, guest : guest});
	  		} else {
	    		req.flash('danger','You do not have permission to see this page');
	    		res.redirect('/');
	  		};
	  	})
	})
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