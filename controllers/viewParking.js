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
		}]
	});
	//res.send(parkings);
	res.render('viewParking', {
		parking_spaces: parking_spaces,
		parking_name: parking_name
	});
});

module.exports = router;