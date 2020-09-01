const express = require('express');
const router = express.Router();
const passport = require("passport");
const { Connection } = require('pg');

router.get('/', checkAuthenticated, (req, res) =>{
	res.render('login');
});

router.post('/', 
	passport.authenticate("local", {
		successRedirect: "/users/dashboard",
		failureRedirect: "/users/login",
		failureFlash: true
	})
);

function checkAuthenticated(req, res, next) {
	//console.log('tuk: ' + req);
	if (req.isAuthenticated()) {
		return res.redirect("/users/dashboard");
	}
	next();
}

module.exports = router;