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




module.exports = router;

