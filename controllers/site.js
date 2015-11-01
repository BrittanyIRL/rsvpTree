var express = require("express");
var router = express.Router(); //call router like app
var request = require("request");
//var db = require("./../models");
var bodyParser = require("body-parser");
router.use(bodyParser({urlencoded: false}));

router.get('/site', function(req, res){
	res.render('./site'); //add :id once generating
});



module.exports = router;  // tell node what to export