const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	req.logout();
	res.render("home", { message: "You have logged out successfully" });
});

module.exports = router;