const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, (req, res) =>{
	res.render('addParking');
});

async function validateAndCreateParking(parkingName, parkingAddress, parkingSpaceCount){
	let errors = [];

	if(await db.Parking.findOne({where: {name: parkingName}})){
		errors.push({message: "Parking already exists!"});
		return {
			isValid: false,
			errors: errors,
			parkingName: parkingName,
			parkingAddress: parkingAddress,
			parkingSpaceCount: parkingSpaceCount
		};
	}else{
		await db.Parking.build({
			name: parkingName,
			address: parkingAddress
		}).save();

		var parking = await db.Parking.findOne({where: {name: parkingName}});

		for(i = 0; i < parkingSpaceCount; i++){
			await db.Parking_Space.build({
				spaceNumber: parking.name + "_" + (i + 1),
				parkingID: parking.id
			}).save();
		};

		return {
			isValid: true,
			parking: parking
		};
	}
}

router.post('/', async (req, res) => {
	let {_parkingName, _parkingAddress, _parkingSpaceCount} = req.body;
	
	var result = await validateAndCreateParking(_parkingName, _parkingAddress, _parkingSpaceCount);

	if(result.isValid = false){
		res.render('addParking', {
			errors: result.errors,
			_parkingName: result.parkingName,
			_parkingAddress: result.parkingAddress,
			_parkingSpaceCount: result.parkingSpaceCount
		});
	}else{
		res.status(200);
		res.redirect("/users/dashboardPO");
	}
});

module.exports = {
	addParking: router,
	addParkingFunc: validateAndCreateParking
};