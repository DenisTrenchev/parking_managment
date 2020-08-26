const localStrategy = require("passport-local").Strategy;
const users = require('../models/users');
const bcrypt = require("bcrypt");

function initialize(passport){
	console.log("Initialized");

	const authenticateUser = async (email, password, done) => {
		console.log(email, password);

		var User;
		if(User = await users.findOne({where: {email: email}})){
			//console.log(User.password);
			bcrypt.compare(password, User.password, (err, isMatch) => {
				if (err) {
					console.log(err);
				}
				if (isMatch) {
					return done(null, User);
				} else {
					return done(null, false, {message: "Password is incorrect"});
				}
			});
		}else{
			return done(null, false, {message: "No user with that email address"});
		}
	};

	passport.use(
		new localStrategy(
			{usernameField: "_email", passwordField: "_password"}, authenticateUser
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		await users.findOne({where: {id: id}});
		return done(null, users);
	});
};
module.exports = initialize;