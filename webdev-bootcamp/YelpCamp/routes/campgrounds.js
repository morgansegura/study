var express = require("express"),
	router	= express.Router();

/*====
 ==== CAMPGROUND ROUTES
 ====*/

// ==* Campgrounds Route *==
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

// ==* Campgrounds POST Route *==
router.post("/campgrounds", function(req, res){
    // get data back from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
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
router.get("/campgrounds/new", isLoggedIn,  function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/new", {campground: campground});
		}
	})
});


// ==* Show details page
router.get("/campgrounds/:id", function(req, res){
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

/*====
 ==== EXPORT ROUTES
 ====*/
module.exports = router;