const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	users = await db.User.findAll();

	res.render('dashboardAdmin', {
		users: users
	});
});

module.exports = router;