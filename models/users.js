const sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User',{
	firstName: {
		type: sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: sequelize.STRING,
		allowNull: false
	},
	birthDate: {
		type: sequelize.DATE,
		allowNull: false
	},
	email: {
		type: sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: sequelize.STRING,
		allowNull: false
	},
	role: {
		type: sequelize.INTEGER,
		allowNull: false
	}
}, {
	tableName: 'Users'
});

module.exports = User;