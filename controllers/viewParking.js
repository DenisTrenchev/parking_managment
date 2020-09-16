const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, async (req, res) =>{
	parkings = await db.Parking_Space.findAll({
		include: [{
			model: db.Parking,
			attributes: ['name', 'address'],
			where: {userID: req.user.id}
		}]
	});
	//res.send(parkings);
	res.render('viewParking', {
		parkings: parkings
	});
});

module.exports = router;