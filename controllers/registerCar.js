const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, (req, res) =>{
	res.render('registerCar');
});

async function validateAndCreateCar(carBrand, carModel, carLicensePlate, userID){
	let errors = [];

	if(await db.Car.findOne({where: {licensePlate: carLicensePlate}})){
		errors.push({message: "Car already exists"});
			return {
				isValid: false,
				errors: errors,
				carBrand: carBrand,
				carModel: carModel,
				carLicensePlate: carLicensePlate
			}
	}else{
		await db.Car.build({
			brand: carBrand,
			model: carModel,
			licensePlate: carLicensePlate,
			userID: userID
		}).save();

		return {
			isValid: true
		};
	}
}

router.post('/', async (req, res) => {
	let {_carBrand, _carModel, _carLicensePlate} = req.body;

	var result = await validateAndCreateCar(_carBrand, _carModel, _carLicensePlate, req.user.id);

	if(result.isValid == false){
		res.render('registerCar', {
			errors: result.errors,
			_carBrand: result.carBrand,
			_carModel: result.carModel,
			_carLicensePlate: result.carLicensePlate
		});
	}else{
		res.redirect("/users/dashboard");
	}

});

module.exports = {
	registerCar: router,
	registerCarFunc: validateAndCreateCar
};