var express = require('express');
var router = express.Router();

// router.get('/', function (req, res, next) {
// 	res.send('Hello world!');
// });

router.get('/', (req, res) =>{
	res.render('home');
});

module.exports = router;
