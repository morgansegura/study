var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

/*====
 ==== SETUP USER SCHEMA
 ====*/
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
	
});

/*====
 ==== EXPORT USER SCHEMA
 ====*/
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);