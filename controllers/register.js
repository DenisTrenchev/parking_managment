const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Connection } = require('pg');
const db = require('../models');
const helpers = require('../helpers/util');

router.get('/', helpers.checkAuthenticated, (req, res) =>{
	res.render('register');
});

router.post('/', async (req, res) => {
	let {_firstName, _lastName, _email, _password, _password2} = req.body;
	let errors = [];

	if(!_firstName || !_lastName || !_email || !_password || !_password2){
		errors.push({message: "Please enter all fields!"});
	}

	if(_password.length < 1){
		errors.push({message: "Password must be a least 8 characters long!"});
	}

	if(_password != _password2){
		errors.push({message: "Passwords do not match!"});
	}

	if(errors.length > 0){
		res.render("register", {errors, _firstName, _lastName, _email, _password, _password2});
	}else{
		hashedPassword = await bcrypt.hash(_password, 10);

		if(await db.User.findOne({attributes: ['email'], where: {email: _email}})){
			errors.push({message: "Email already registered"});
			res.render('register', {errors});
		}else{
			await db.User.build({
				firstName: _firstName, 
				lastName: _lastName,
				email: _email,
				password: hashedPassword,
				userRole: '1'
			}).save();
			
			res.status(200);
			res.redirect("/users/login");
		}
	}
});

module.exports = router;