const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, async (req, res) =>{
	cars = await db.Car.findAll({
		where: {userID: req.user.id}
		// include: [{
		// 	model: db.Parking_Space,
		// 	atributes: ['carID']
		// }]
	});
	parkingSpaces = await db.Parking_Space.findAll({
		where: {
			userID: req.user.id,
			carID: null
		}
	});
	
	res.render('assignCarToSpace', {
		cars: cars,
		parkingspaces: parkingSpaces
	});
});

router.post('/', async (req, res) =>{
	let {_selectedCar, _selectedParkingSpace} = req.body;
	console.log(_selectedCar, _selectedParkingSpace);
	await db.Parking_Space.update(
		{carID: _selectedCar},
		{where: {id: _selectedParkingSpace}}
	);

	res.redirect('dashboard');
});

module.exports = router;