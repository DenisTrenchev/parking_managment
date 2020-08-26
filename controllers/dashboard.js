const express = require('express');
const router = express.Router();

router.get('/', checkNotAuthenticated, (req, res) =>{
	res.render('dashboard');
});

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/users/login");
}

module.exports = router;