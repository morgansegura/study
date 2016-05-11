var express 	= require("express"),
	router		= express.Router({mergeParams: true}),
	passport	= require("passport"),	
	Campground 	= require("../models/campground"),
	Comment 	= require("../models/comment"),
	middleware	= require("../middleware");

/*====
 ==== COMMENTS
 ====*/

// ==* Show details page *==
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})	
});

//*== Show details page *==
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {

			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);	
				} else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added comment!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});	
});

//*== EDIT Comments *==
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});			
		}
	});
});


//*== UPDATE Comments *==
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully updated!");
			res.redirect("/campgrounds/" + req.params.id);			
		}
	});
});

//*== DELETE Comments *==
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully deleted!");
			res.redirect("/campgrounds/" + req.params.id);			
		}
	});
});


/*====
 ==== EXPORT ROUTES
 ====*/
module.exports = router;