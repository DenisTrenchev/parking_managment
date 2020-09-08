const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	parkings = await db.Parking.findAll();

	res.render('selectParking', {
		parkings: parkings
	})
	
});

router.post('/', async (req, res) => {
	let {_selectedParking} = req.body;
	parking_spaces = await db.Parking_Space.findAll({where: {parkingID: _selectedParking}});

	res.render('parking', parking_spaces);
});

module.exports = router;