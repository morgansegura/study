var express 	= require("express"),
	router		= express.Router(),
	passport	= require("passport"),	
	User 		= require("../models/user");

/*====
 ==== ROOT ROUTE
 ====*/
	
// ==* Home Route *==
router.get("/", function(req, res){
    res.render("landing");
});

/*====
 ==== SETUP AUTH ROUTES
 ====*/

//*== Register Page *==
router.get("/register", function(req, res){
	res.render("register");
})

//*== Register Post Page *==
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//*== Login Page *==
router.get("/login", function(req, res){
	res.render("login");
})

//*== Login Post Page *==
router.post("/login", passport.authenticate("local", 
	 {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"	
	}), function(req, res){
});

//*== Logout Page *==
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

//*== Middleware *==
function isLoggedIn(req, res, next){
	if( req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

/*====
 ==== EXPORT ROUTES
 ====*/
module.exports = router;