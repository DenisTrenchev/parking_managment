const db = require('./models');

db.sequelize.sync({force: true}).then(() => {
	//require('./models/users').sync({force: true});
	// require('./models/users').build({
	// 	firstName: "Pesho", 
	// 	lastName: "Peshov", 
	// 	birthDate: "1996-01-05",
	// 	email: "pesho@abv.bg",
	// 	password: "asd",
	// 	role: "1"
	// }).save();
}).catch();

