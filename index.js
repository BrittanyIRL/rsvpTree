var express = require("express"); //imports express as an object, make app
var app = express(); //call express as a function
var ejsLayouts = require("express-ejs-layouts"); //get layout 
var bodyParser = require("body-parser");
var db = require("./models"); //get database table (called favorite), used for tracking favorite movies
//middleware here
app.use(ejsLayouts); 
app.use(express.static(__dirname + '/views'));
app.use(bodyParser({urlencoded: false}));
app.set("view engine", "ejs");
/* page outline
views/index.ejs is the landing page
index.ejs/guest/enter : enter party code
index.ejs/guest/confirm : confirm correct party matches code
index.ejs/guest/rsvp: yes or no
index.ejs/guest/confirm : form of guest questions and then send to page
index.ejs/guest/decline : display message of regret and link to view site anyways

index.ejs/portal/set-up : account set up
index.ejs/portal/settings: account details managed
index.ejs/portal/index : account dash
index.ejs/portal/rsvplist : account master list of invites
index.ejs/portal/tree : account tree views

views/error.ejs - for all 404s and redirects 
*/
//routes start here
//render homepage 
app.get('/', function(req, res){ //sets root
 	res.render('index');
 });

// app.get('/portal/set-up', function(req, res){ //sets root
//  	res.render('portal/set-up');
//  });

// app.get('/portal/settings', function(req, res){
// 	res.render('portal/settings'); //add :id once generating
// });


//controllers
app.use("/portal", require('./controllers/admin'));
app.use("/guest", require('./controllers/guest'));
app.use("/", require('./controllers/site'));



app.listen(3000);

console.log("This is port 3000");