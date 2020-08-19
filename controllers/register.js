var express = require('express');
const { Connection } = require('pg');
var router = express.Router();

router.get('/', (req, res) =>{
	res.render('register');
});

module.exports = router;