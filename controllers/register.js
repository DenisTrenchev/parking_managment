const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Connection } = require('pg');
const db = require('../models');
const helpers = require('../helpers/util');

router.get('/', helpers.checkAuthenticated, (req, res) =>{
	res.render('register');
});

async function validateAndCreateUser(firstName, lastName, email, password, password2){
	let errors = [];
	let errorsStatus = {};

	if(!firstName || !lastName || !email || !password || !password2){
		errors.push({message: "Please enter all fields!"});
		errorsStatus.allFields = true;
	}

	if(password.length < 8){
		errors.push({message: "Password must be a least 8 characters long!"});
		errorsStatus.passwordLength = true;
	}

	if(password != password2){
		errors.push({message: "Passwords do not match!"});
		errorsStatus.passwordMatch = true;
	}

	if(errors.length > 0){
		return {
			isValid: false,
			errors: errors,
			errorsStatus: errorsStatus,
			firstName: firstName, 
			lastName: lastName,
			email: email,
			password: password,
			password2: password2
		};
	}else{
		hashedPassword = await bcrypt.hash(password, 10);

		if(await db.User.findOne({attributes: ['email'], where: {email: email}})){
			errors.push({message: "Email already registered"});
			errorsStatus.emailExists = true;
			return {
				isValid: false,
				errors: errors,
				errorsStatus: errorsStatus,
				firstName: firstName, 
				lastName: lastName,
				email: email,
				password: password,
				password2: password2
			};
		}else{
			await db.User.build({
				firstName: firstName, 
				lastName: lastName,
				email: email,
				password: hashedPassword,
				userRole: '1'
			}).save();
			
			return {
				isValid: true
			};
		}
	}
};

router.post('/', async (req, res) => {
	let {_firstName, _lastName, _email, _password, _password2} = req.body;

	var result = await validateAndCreateUser(_firstName, _lastName, _email, _password, _password2);

	if(result.isValid == false){
		res.render('register', {
			errors: result.errors, 
			_firstName: result.firstName, 
			_lastName: result.lastName, 
			_email: result.email, 
			_password: result.password, 
			_password2: result.password2
		});
	}else{
		res.status(200);
		res.redirect("/users/login");
	}
});

module.exports = {
	register: router,
	registerFunc: validateAndCreateUser
};