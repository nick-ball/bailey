var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var Post = require("./models/post");
//requiring routes 

var postRoutes = require("./routes/posts.js");
var indexRoutes = require("./routes/index");

var moment = require("moment");
// var url = process.env.MONGOLAB_URI;

// mongoose.connect(process.env.MONGOLAB_URI, {useNewUrlParser: true});
// mongoose.connect(url, {useNewUrlParser: true});
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//require moment.js for time since posts
app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Bailey is my son",
	resave: false,
	saveUninitialized: false
}));

app.use(function(req, res, next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);

app.use("/posts", postRoutes);

// http://localhost:3000/
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Bailey's server has started!");
});