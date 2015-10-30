var express = require("express"); //imports express as an object, make app
var app = express(); //call express as a function
var ejsLayouts = require("express-ejs-layouts"); //get layout 
var bodyParser = require("body-parser");
//var db = require("./models"); //get database table (called favorite), used for tracking favorite movies
//middleware here
app.use(ejsLayouts); 
app.use(express.static(__dirname + '/views'));
app.use(bodyParser({urlencoded: false}));
app.set("view engine", "ejs");


//routes start here
app.get("/", function(req, res){ //sets root
 	res.send("Hey world");
 });

//controllers
//app.use("/favorites", require("./controllers/favorites"));


app.listen(3000);

console.log("This is port 3000");