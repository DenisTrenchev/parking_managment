const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	//var parking = await db.Parking.findOne({where: {name: req.params._parkingName}});
	//await db.Parking_Space.findAll({where: {parkingID: parking.id}});
	console.log(req.body);
	res.render('viewParking', {
		test: req.body
	});
});

module.exports = router;