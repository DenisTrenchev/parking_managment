class Helpers{
	static checkAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			if(req.user.userRole == 1){
				return res.redirect("/users/dashboard");
			}
			if(req.user.userRole == 2){
				return res.redirect("/users/dashboardPO");
			}
			if(req.user.userRole == 3){
				return res.redirect("/users/dashboardAdmin");
			}
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