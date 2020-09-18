const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	user = await db.User.findOne({where: {id: req.selectedUser.id}});

	res.render('changeUserRole', {
		user: user
	});
});

router.post('/', async (req, res) => {
	let {_role} = req.body;

	await db.User.update(
		{userRole: _role},
		{where: {id: req.selectedUser.id}}
	);

	res.redirect('dashboardAdmin');
});

module.exports = router;