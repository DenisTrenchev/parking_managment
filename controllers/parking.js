const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	parking_spaces = await db.Parking_Space.findAll({where: {parkingID: req.query._selectedParking, userID: null}});

	res.render('parking',{
		parking_spaces
	})
});

router.post('/', async (req, res) =>{
	let {parking_spaces} = req.body;
	console.log(parking_spaces);

	await db.Parking_Space.update(
		{userID: req.user.id}, 
		{where: {id: parking_spaces}}
	);
});

module.exports = router;