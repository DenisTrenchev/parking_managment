const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports = new Sequelize('parking_managment', 'postgres', 'z', {
	host:'localhost', 
	dialect: 'postgres', 
	operatorAliases: false, 
	pool: {
		max: 5, 
		min:0, 
		acquire: 30000, 
		idle: 10000
	}
});