const express = require('express');
const router = express.Router();
const users = require('../models/users');
const { Connection } = require('pg');

router.get('/', (req, res) =>{
	res.render('login');
});

router.post('/', (req, res) => {
	let {email, password} = req.body;

	console.log({
		email, 
		password
	});
});

module.exports = router;