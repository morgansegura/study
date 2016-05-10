var express 	= require("express"),
	router		= express.Router(),
	passport	= require("passport"),	
	Campground 	= require("../models/campground"),
	Comment 	= require("../models/comments");

/*====
 ==== COMMENTS
 ====*/

// ==* Show details page *==
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})	
});

//*== Show details page *==
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {

			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);	
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});

		}
	})	
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