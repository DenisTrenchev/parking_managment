module.exports = {
	"development": {
		"username": "postgres",
		"password": "z",
		"database": "parking_managment",
		"host": "127.0.0.1",
		"dialect": "postgres"
	},
	"test": {
		"username": "root",
		"password": null,
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
// const Sequelize = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// module.exports = new Sequelize('parking_managment', 'postgres', 'z', {
// 	host:'localhost', 
// 	dialect: 'postgres', 
// 	operatorAliases: false, 
// 	pool: {
// 		max: 5, 
// 		min:0, 
// 		acquire: 30000, 
// 		idle: 10000
// 	}
// });
