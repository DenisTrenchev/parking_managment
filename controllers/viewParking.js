const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, async (req, res) =>{
	parking_name = await db.Parking.findOne({
		where: {
			id: req.query._selectedParking
		}
	});
	parking_spaces = await db.Parking_Space.findAll({
		where:{
			parkingID: req.query._selectedParking
		},
		include: [{
			model: db.Parking,
			attributes: ['name', 'address'],
			where: {userID: req.user.id}
		}],
		include: [{
			model: db.Car
		}]
	});

	let occupiedSpaces = 0;
	let freeSpaces = 0;
	let allSpaces = 0;
	let occupiedSpacesPercent = 0;

	parking_spaces.forEach(element => {
		allSpaces++;
		if(element.userID){
			occupiedSpaces++;
		}else{
			freeSpaces++;
		}
	});
	
	occupiedSpacesPercent = ((occupiedSpaces * 100)/allSpaces).toFixed(2);
	//res.send(parking_spaces);
	res.render('viewParking', {
		parking_spaces: parking_spaces,
		parking_name: parking_name,
		occupiedSpaces: occupiedSpaces,
		freeSpaces: freeSpaces,
		occupiedSpacesPercent: occupiedSpacesPercent
	});
});

module.exports = router;