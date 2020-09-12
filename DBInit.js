const db = require('./models');

db.Parking_Space_Type.bulkCreate([
	{
		name: 'Car'
	},
	{
		name: 'Bus'
	},
	{
		name: 'Motorcycle'
	}
]);

db.User_Role.bulkCreate([
	{
		name: 'user'
	},
	{
		name: 'parking-owner'
	},
	{
		name: 'admin'
	}
]);