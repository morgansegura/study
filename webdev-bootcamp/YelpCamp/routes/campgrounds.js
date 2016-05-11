var express     = require("express"),
	router	    = express.Router(),
    Campground  = require("../models/campground"),
	middleware	= require("../middleware");

/*====
 ==== POST ROUTES
 ====*/

// ==* Campgrounds Route *==
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

// ==* Campgrounds POST Route *==
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data back from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    // Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            // redirect bck to campgrounds page    
            res.redirect("/campgrounds");            
        }
    });

});

// ==* New Campgrounds route *==
router.get("/new", middleware.isLoggedIn,  function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/new", {campground: campground});
		}
	})
});


// ==* Show details page
router.get("/:id", function(req, res){
    // find the campground with the correct id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // Show the show page
            res.render("campgrounds/show", {campground: foundCampground});            
        }
    });
});

// ==* Campgrounds Edit Route *==
router.get("/:id/edit", middleware.checkPostOwner, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// ==* Campgrounds Edit PUT Route *==
router.put("/:id", middleware.checkPostOwner, function(req, res){

    Campground.findByIdAndUpdate(req.params.id, req.body.campground,  function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);

        }
    })
});

// ==* Campgrounds DELETE Route *==
router.delete("/:id", middleware.checkPostOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, req.body.campground,  function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

/*====
 ==== EXPORT ROUTES
 ====*/
module.exports = router;