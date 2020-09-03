const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, (req, res) =>{
	res.render('dashboardPO');
});

router.post('/', async (req, res) => {
	let {_parkingName, _parkingAddress, _parkingSpaceCount} = req.body;
	let errors = [];

	console.log({
		_parkingName,
		_parkingAddress,
		_parkingSpaceCount
	});

	if(errors.length > 0){
		res.render('dashboardPO', {errors, _parkingName, _parkingAddress, _parkingSpaceCount});
	}else{
		if(await db.Parking.findOne({where: {name: _parkingName}})){
			errors.push({message: "Parking already exists!"});
			res.render('dashboard', {errors});
		}else{
			await db.Parking.build({
				name: _parkingName,
				address: _parkingAddress
			}).save();

			var parking = await db.Parking.findOne({where: {name: _parkingName}});
			console.log(parking.name);

			for(i = 0; i < _parkingSpaceCount; i++){
				await db.Parking_Space.build({
					spaceNumber: parking.name + "_" + (i + 1),
					parkingID: parking.id
				}).save();
			};
			console.log("Parking created!");
			res.status(200);
			res.redirect("/users/viewParking");
		}
	}
});

module.exports = router;