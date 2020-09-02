class Helpers{
	static checkAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return res.redirect("/users/dashboard");
		}
		next();
	}

	static checkNotAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect("/users/login");
	}
}

module.exports = Helpers;