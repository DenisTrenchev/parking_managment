const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	// parking_spaces = await db.Parking_Space.findAll({where: {}});

	// res.render('dparking',{
	// 	parkings: parkings
	// })
	console.log(req.body);
	res.render('parking',{
		parking_spaces: req.body
	})
	
});

router.post('/', async (req, res) =>{
	
});

module.exports = router;