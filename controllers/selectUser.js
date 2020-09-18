const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', /*helpers.checkNotAuthenticated,*/ async (req, res) =>{
	users = await db.User.findAll();

	res.render('selectUser', {
		users: users
	});
});

router.post('/', async (req, res) => {
	let {_selectedUser} = req.body;
	selectedUser = await db.User.findOne({where: {id: _selectedUser}})

	res.render('changeUserRole', selectedUser);
});
module.exports = router;