var express     	= require("express"),
    mongoose    	= require("mongoose"),
	passport    	= require("passport"),
    bodyParser  	= require("body-parser"),		
    LocalStrategy	= require("passport-local"),		
    Campground  	= require("./models/campground"),
    Comment  		= require("./models/comment"),
	User 			= require("./models/user"),
    seedDB      	= require("./seeds"),
	app         	= express();

/*====
 ==== INCLUDE ROUTES
 ====*/
var indexRoutes = require("./routes/index"),
	campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes = require("./routes/comments");

/*====
 ==== SETP THE DB
 ====*/
mongoose.connect("mongodb://localhost/yelp_camp_v4");

/*====
 ==== SETUP BODY PARSER
 ====*/
app.use(bodyParser.urlencoded({extended: true}));

/*====
 ==== SETUP VIEW ENGINE
 ====*/
app.set("view engine", "ejs");

/*====
 ==== SETUP ASSET GLOBAL PATH
 ====*/
app.use(express.static(__dirname + "/public"));

/*====
 ==== SEED THE DB
 ====*/
seedDB();

/*====
 ==== SETUP LOCAL SESSIONS
 ====*/
app.use(require("express-session")({
	secret: "I have the best family in the world",
	resave: false,
	saveUninitialized: false	
}));
app.use(passport.initialize());
app.use(passport.session());

/*====
 ==== PASSPORT CONFIGURATION
 ====*/
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*====
 ==== PASS DATA TO TEMPLATES
 ====*/
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

/*====
 ==== USE ROUTES
 ====*/
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

/*====
 ==== START THE SERVER
 ====*/
var port = 8080; // develop port

app.listen(port, function(){
    console.log("sever opened at port: " + port);
});
/*
var listener = app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server is live on port " + listener.address().port);
});
*/