var express = require("express"),
	app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("home");
});


/*====
 ==== SETUP ROUTES
 ====*/







/*====
 ==== START THE SERVER
 ====*/

var listener = app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server is live on port " + listener.address().port);
});
