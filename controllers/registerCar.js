const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkAuthenticated,*/ (req, res) =>{
	res.render('registerCar');
});

router.post('/', async (req, res) => {
	let {_carBrand, _carModel, _carLicensePlate} = req.body;
	let errors = [];

	// console.log({_carBrand, _carModel, _carLicensePlate});
	// console.log(req.user.id)

	if(await db.Car.findOne({where: {licensePlate: _carLicensePlate}})){
		errors.push({message: "Email already registered"});
			res.render('register', {errors});
	}else{
		await db.Car.build({
			brand: _carBrand,
			model: _carModel,
			licensePlate: _carLicensePlate,
			userID: req.user.id
		}).save();
	}

	res.redirect("/users/dashboard")
});

module.exports = router;