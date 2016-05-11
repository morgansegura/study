var Campground 	= require("../models/campground"),
	Comment 	= require("../models/comment");

/*====
 ====  MIDDLEWARE
 ====*/

var middlewareObj = {};

middlewareObj.checkPostOwner = function(req, res, next){
	// if the user is logged in
	if(req.isAuthenticated()){
		// Does the user own the campground
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found!");
				res.redirect("back");
			} else {
				// does the user own the post?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					// the user doesn not have permission
					res.redirect("back");
				}
			}
		});		
	} else {
		req.flash("error", "You need to be logged in to do that!");
		// go back to the last page the user was on
		res.redirect("back");
	}		
};

middlewareObj.checkCommentOwner = function(req, res, next){
// if the user is logged in
	if(req.isAuthenticated()){
		// Does the user own the campground
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found!");
				res.redirect("back");
			} else {
				// does the user own the post?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					// the user doesn not have permission
					res.redirect("back");
				}
			}
		});		
	} else {
		req.flash("error", "You need to be logged in to do that!");
		// go back to the last page the user was on
		res.redirect("back");
	}		
};
// Logged in
middlewareObj.isLoggedIn = function(req, res, next){
	if( req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
};

/*====
 ==== EXPORT MIDDLEWARE
 ====*/
module.exports = middlewareObj;