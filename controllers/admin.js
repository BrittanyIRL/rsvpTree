var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));

//WORKS
router.get('/', function(req, res){ //DO NOT CHANGE THIS 
	console.log("FOUND BASE ROUTE" + req.user.id);
	db.user.findById(req.user.id)
	.then(function(user){
	 	db.setting.find({
	 		where: {
				id: req.user.settingId
			}
		}).then(function(setting){
			db.guest.findAll({
				where: {
					portalCode: setting.portalCode
				}
			}).then(function(guests){
				res.render('portal/index', { user : user, setting : setting, guests : guests })
			});
		});
	});
});

//WORKS
router.get('/settings', function(req, res){
	// req.session.userId = req.user.id;
	if (req.user) {
		console.log("FOUND SETTINGS CONSOLE" + req.user.id)
		db.setting.findAll().then(function(setting){
			res.render('portal/settings', { setting : setting });
		})
  	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		}
  	});

var sessionUser = null; 
//post settings successfully captures settings for a user and sets settingID 
//WORKS
router.post('/settings', function(req, res){
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
			db.user.findById(req.user.id).then(function(user){
				user.settingId = setting.id
				user.save().then(function(user){
					res.render('portal/index', { setting : setting })
				});
			});
		});
	});
//render tree
router.get('/tree', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
		console.log("FOUND RSVP ROUTE" + JSON.stringify(req.user));
		db.user.findById(req.user.id)
		.then(function(user){
		 	db.setting.find({
		 		where: {
					id: req.user.settingId
				}
			}).then(function(setting){
				db.guest.find({
					where: {
						portalCode: setting.portalCode
					}
				}).then(function(guest){
					res.render('portal/tree', { user : user, setting : setting, guest : guest })
				})
			})
	});
	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		}
  	});

router.get('/addGuest', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
		console.log("FOUND RSVP ROUTE" + JSON.stringify(req.user));
		db.user.findById(req.user.id)
		.then(function(user){
		 	db.setting.find({
		 		where: {
					id: req.user.settingId
				}
			}).then(function(setting){
				db.guest.create({
					where: {
						portalCode: setting.portalCode
					}
				}).then(function(guest){
					res.render('portal/addGuest', { user : user, setting : setting, guest : guest })
				});
			});
	});
	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		}
  	});

//this is not quite working 
router.post('/addGuest', function(req, res){
	var newGuest = req.body;
	db.user.findById(req.user.id).then(function(user){
		db.setting.find({
			where: {
				id: req.user.settingId
			}
		}).then(function(setting){
			db.guest.create({
				firstName: (req.body.firstName ? req.body.firstName : null),
				lastName: (req.body.lastName ? req.body.lastName : null),
				rsvp: (req.body.rsvp ? req.body.rsvp : false),
				portalCode: req.user.settingId,
				email: (req.body.email ? req.body.email : "none"),
				diet: (req.body.diet ? req.body.diet : "no"),
				party: (req.body.party ? req.body.party : null ),
				childAge: (req.body.childAge ? req.body.childAge : null),
				childName: (req.body.childName ? req.body.childName : "none"),
				count: (req.body.count ? req.body.count : 0 ),
				plusOneLastName: (req.body.plusOneLastName ? req.body.plusOneLastName : null),
				plusOneFirstName: (req.body.plusOneFirstName ? req.body.plusOneFirstName : null)
			}).spread(function(guest, created){
				guest.save().then(function(guests){
					res.render('portal/rsvplist', { user : user, setting : setting, guests : guests })
				});
			});
		});
	});
});


//render rsvps
router.get('/rsvplist', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
		console.log("FOUND RSVP ROUTE" + JSON.stringify(req.user));
		db.user.findById(req.user.id)
		.then(function(user){
		 	db.setting.find({
		 		where: {
					id: req.user.settingId
				}
			}).then(function(setting){
				db.guest.findAll({
					where: {
						portalCode: setting.portalCode
					}
				}).then(function(guests){
					console.log(guests);
					var rsvpCount = 0;
					guests.forEach(function(guest){
						if(guest.rsvp){
							rsvpCount ++;
						}
					});
					var childCount = 0;
					guests.forEach(function(guest){
						if(guest.childName != null){
							childCount ++;
						}
					});
					var declineCount = 0;
					guests.forEach(function(guest){
						if(guest.rsvp === false){
							declineCount ++;
						}
					})
					console.log(declineCount);
					res.render('portal/rsvplist', { user : user, setting : setting, guests : guests, rsvpCount : rsvpCount, childCount : childCount, declineCount : declineCount })
				})
			})
		});
	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		};
});



router.get('/site', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
		console.log("FOUND RSVP ROUTE" + JSON.stringify(req.user));
		db.user.findById(req.user.id)
		.then(function(user){
		 	db.setting.find({
		 		where: {
					id: req.user.settingId
				}
			}).then(function(setting){
				db.guest.find({
					where: {
						portalCode: setting.portalCode
					}
				}).then(function(guest){
					res.render('portal/site', { user : user, setting : setting, guest : guest })
				})
			})
		});
	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		};
});




module.exports = router;  // tell node what to export