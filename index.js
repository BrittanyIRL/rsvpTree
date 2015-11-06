var express = require("express"); //imports express as an object, make app
var ejsLayouts = require("express-ejs-layouts"); //get layout 
var bodyParser = require("body-parser");
var db = require("./models"); //get database table (called favorite), used for tracking favorite movies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var strategies = require('./config/strategies');
var session = require('express-session');
var flash = require('connect-flash');
var FacebookStrategy = require('passport-facebook').Strategy;
// var upload = multer({ dest: './uploads/' });
// var cloudinary = require('cloudinary');
var app = express(); //call express as a function
//middleware here
app.set("view engine", "ejs");
app.use(ejsLayouts); 
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(session({
	//cookieName: 'session', //added in hopes of guest rsvp working
  secret: 'keepitsecretkeepitsafe',
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

passport.use(strategies.localStrategy);
passport.use(strategies.facebookStrategy);

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

// cloudinary.config({ 
//   cloud_name: 'rsvptree', 
//   api_key: '985637378986115', 
//   api_secret: '5au6WXa5kj_xvIaO5TDfB9uwMGw' 
// });

//controllers
app.use("/", require('./controllers/site'));
app.use("/portal", require('./controllers/admin'));
app.use("/guest", require('./controllers/guest'));
app.use("/auth", require('./controllers/auth'));


app.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
  var id = req.params.id;
  db.guest.find({
  	where: { id : id 
  	}
  }).then(function(guest){
  	db.guest.removeGuest(req.params.id).then(function(){
  		res.send('Ajax');
  	});
  });
});



app.get('/:a', function(req, res){
	res.render('error');
});

app.listen(process.env.PORT || 3000)

console.log("This is port 3000");