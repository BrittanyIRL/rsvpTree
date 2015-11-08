var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));

//render home page post log in
router.get('/', function(req, res){ 
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

//render setting page by portalcode and user id
router.get('/settings', function(req, res){
	if (req.user) {
		db.setting.findAll().then(function(setting){
			res.render('portal/settings', { setting : setting });
		})
  	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		}
  	});

//post settings successfully captures settings for a user and sets settingID 
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
			db.user.findById(req.user.id).then(function(user){
				user.settingId = setting.id
				user.save().then(function(user){
					res.render('portal/index', { setting : setting })
				});
			});
		});
	});

//render tree - this is loading but the jquery for the page has not been built yet, this route is just to jog my memory for when i implement this 
router.get('/tree', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
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

//get to the add guest on admin level page 
router.get('/rsvplist/addGuest/:id', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
		id = req.params.portalCode;
		db.user.findById(req.user.id)
		.then(function(user){
			db.setting.find({
			where: {
				portalCode: id
			},
			include: [ db.guest ]
		}).then(function(setting){
			res.render('portal/addGuest', { setting : setting, user : user }) //removed user
			});
		});
		} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		}
  	});


//add guests on admin level 
router.post('/rsvplist/addGuest/:id', function(req, res){
	console.log("setting id still intact: " + req.params.id);
	id = req.params.id;
	db.user.findById(req.user.id)
		.then(function(user){
			db.setting.find({
			where: {
				portalCode: req.params.id
			},
			include: [ db.user ]
		}).then(function(setting){
				db.guest.create({
					firstName: (req.body.firstName ? req.body.firstName : null),
					lastName: (req.body.lastName ? req.body.lastName : null),
					rsvp: (req.body.rsvp ? req.body.rsvp : false),
					portalCode: req.params.id,
					email: (req.body.email ? req.body.email : "none"),
					diet: (req.body.diet ? req.body.diet : "no"),
					party: (req.body.party ? req.body.party : null ),
					childAge: (req.body.childAge ? req.body.childAge : null),
					childName: (req.body.childName ? req.body.childName : "none"),
					count: (req.body.count ? req.body.count : 0 ),
					plusOneLastName: (req.body.plusOneLastName ? req.body.plusOneLastName : null),
					plusOneFirstName: (req.body.plusOneFirstName ? req.body.plusOneFirstName : null)
				}).then(function(guests){
					res.redirect('/portal/rsvplist/')
				});
			});
		});
});


//render master rsvp list by portalCode and functions for numbers on side screen 
router.get('/rsvplist/', function(req, res){ //DO NOT CHANGE THIS 
	if (req.user) {
		id = req.params.id;
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
					res.render('portal/rsvplist', 
					{ 	user : user, 
						setting : setting, 
						guests : guests, 
						rsvpCount : rsvpCount, 
						childCount : childCount, 
						declineCount : declineCount 
					})
				})
			})
		});
	} else {
    	req.flash('danger','You do not have permission to see this page');
    	res.render('./', { alerts : req.flash()} );
  		};
});


//render the portal site, this is mainly a live preview of what will be shown to guests post rsvp
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

//delete guests from event on admin level 
router.get('/rsvplist/delete/:id', function(req, res){
	var id = req.params.id;
	db.guest.destroy({
  		where: { 
  			id : id 
  		}
  	}).then(function(){
  		res.redirect('/portal/rsvpList');
  	}).catch(function(e){
  		res.send({
  			'msg': 'error',
  			'error':e
  		});
 	});
 });

module.exports = router; 