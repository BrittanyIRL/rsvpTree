var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

// router.get('/portal', function(req, res) {
//   if (req.user) {
//     res.render('restricted');
//   } else {
//     req.flash('danger','You do not have permission to see this page');
//     res.redirect('/');
//   }
// });

module.exports = router;

// router.get('/:portalCode/site', function(req, res){
// 	db.setting.findOrCreate({
// 		where: {
// 			weddingDate: 11716,
// 			location: 'Seattle',
// 			time: '4:00pm',
// 			registry: 'http://fakesitehere.com',
// 			about:'A snake slithers across a tree branch, past what looks like the large iris of a flower his smile vanishes, both eyes pop open, and a terrible thought sweeps across his face. His eyes flick to the side',
// 			picture: 'http://fakepictureurl.com',
// 			phone: 303,
// 			email: 'brittany.brassell@gmail.com',
// 			siteName: 'SITE NAME HERE',
// 			greeting: 'greeting here',
// 			brideFirst: 'Brittany',
// 			brideLast: 'Brassell',
// 			groomFirst: 'Gerrit',
// 			groomLast: 'Feenstra',
// 			portalCode: 1234 }
// 		}).spread(function(setting, created){
// 			res.render('./site', { setting: setting });
// 		})
// });

