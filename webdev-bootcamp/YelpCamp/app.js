var express     = require("express")
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment  	= require("./models/comment"),
    seedDB      = require("./seeds");

// connect to the DB
mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// setup asset direction
app.use(express.static(__dirname + "/public"));
// seed the DB
seedDB();

// home route
app.get("/", function(req, res){
    res.render("landing");
});

// Camprounds route
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

// Camprounds POST route
app.post("/campgrounds", function(req, res){
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

// New Camprounds route
app.get("/campgrounds/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/new", {campground: campground});
		}
	})


});


// Show details page
app.get("/campgrounds/:id", function(req, res){
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


// ====
// Comments Routes
// ====


// Show details page
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})	
});

// Show details page
app.post("/campgrounds/:id/comments", function(req, res){
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

// ====
// Server
// ====

// var port = process.env.PORT, process.env.IP; // production port
var port = 8080; // develop port

app.listen(port, function(){
    console.log("sever opened at port: " + port);
});