const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	carsInfo = await db.Parking_Space.findAll({
		where: {userID: req.user.id},
		include: [{
			model: db.Car,
			attributes: ['brand', 'model', 'licensePlate']
		},{
			model: db.Parking,
			attributes: ['name', 'address']
		}]
	});
	res.render('viewCars', {
		carsInfo: carsInfo
	});
});

module.exports = router;