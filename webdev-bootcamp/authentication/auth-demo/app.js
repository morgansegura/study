var express 				= require("express"),
	mongoose 				= require("mongoose"),
	passport 				= require("passport"),
	bodyParser 				= require("body-parser"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	User 					= require("./models/user"),
	app 					= express();


/*====
 ==== SETUP DB
 ====*/
mongoose.connect("mongodb://localhost/auth_demo_app1");

/*====
 ==== SETUP EJS TEMPLATES
 ====*/
app.set('view engine', 'ejs');

/*====
 ==== URL ENCODE FOR POST FORM
 ====*/
app.use(bodyParser.urlencoded({extended: true}));

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
 ==== SETUP PASSPORT
 ====*/
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*====
 ==== SETUP ROUTES
 ====*/

// ==* Home Route *==
app.get("/", function(req, res){
	res.render("home");
});


// ==* Secret Route *==
app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
});


// ==* Register Route *==
app.get("/register", function(req, res){
	res.render("register");
});

// ==* Post Register Route *==
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/secret");
			});
		}
		
	});
});

// ==* Login Route *==
app.get("/login", function(req, res){
	res.render("login");
});

// ==* Login Register Route *==
app.post("/login", passport.authenticate("local",  {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
	
});

// ==* Logout Route *==
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

/*====
 ==== START THE SERVER
 ====*/

var listener = app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server is live on port " + listener.address().port);
});
