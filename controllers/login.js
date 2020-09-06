const express = require('express');
const router = express.Router();
const passport = require("passport");
const db = require('../models');
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkAuthenticated, (req, res) =>{
	res.render('login');
});

router.get('/check', (req, res) =>{
	res.send(req.user);
});

router.post('/', 
	passport.authenticate("local", {
			failureRedirect: "/users/login",
			failureFlash: true
		})
	,async (req, res) =>{
	passport.authenticate("local",
		async function(err, user, info){
		if(err){
			return next(err);
		}
		if(!user){
			res.redirect("/users/login");
		}else{
			req.logIn(user, function(){
				if(user.userRole == 1){
					res.redirect("/users/dashboard");
				}
				if(user.userRole == 2){
					res.redirect("/users/dashboardPO");
				}
				// if(user.userRole == 3){
				// 	res.redirect("/users/adminPage");
				// }
			})
		}
	})(req, res);
});
	


module.exports = router;