const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const { Connection } = require('pg');
const users = require('../models/users');

router.get('/', (req, res) =>{
	res.render('register.ejs');
});

router.post("/", async (req, res) => {
	let {_firstName, _lastName, _birthDate, _email, _password, _password2} = req.body;
	let errors = [];

	console.log({
		_firstName,
		_lastName,
		_birthDate,
		_email,
		_password,
		_password2
	});

	if(!_firstName || !_lastName || !_birthDate || !_email || !_password || !_password2){
		errors.push({message: "Please enter all fields!"});
	}

	if(_password.length < 1){
		errors.push({message: "Password must be a least 8 characters long!"});
	}

	if(_password != _password2){
		errors.push({message: "Passwords do not match!"});
	}

	if(errors.length > 0){
		res.render("register", {errors, _firstName, _lastName, _birthDate, _email, _password, _password2});
	}else{
		hashedPassword = await bcrypt.hash(_password, 10);
		console.log(hashedPassword);

		if(await users.findOne({attributes: ['email'], where: {email: _email}})){
			console.log("tuk");
			errors.push({message: "Email already registered"})
			res.render('register', {errors});
			//return res.render("register", {message: "Email already registered"});
		}else{
			await users.build({
				firstName: _firstName, 
				lastName: _lastName, 
				birthDate: _birthDate,
				email: _email,
				password: hashedPassword,
				role: "1"
			}).save();
			
			res.status(200);
			res.redirect("/users/login");
		}
	}
});

module.exports = router;