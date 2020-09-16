const db = require('./models');

db.sequelize.sync({force: true}).then().catch();

// Insert parking
// db.Parking.build({
// 	name: 'parking1',
// 	address: 'address1'
// }).save();

// Insert parking spaces
// async function test(){
// 	var parking = await db.Parking.findOne({where: {name: 'parking1'}});
// 	for(i = 0; i < 10; i++){
// 		db.Parking_Space.build({
// 			spaceNumber: parking.name + "_" + (i + 1),
// 			parkingID: parking.id
// 		}).save();
// 	}
// };
// test();

// //Insert parking space types
// db.Parking_Space_Type.bulkCreate([
// 	{
// 		name: 'Car'
// 	},
// 	{
// 		name: 'Bus'
// 	},
// 	{
// 		name: 'Motorcycle'
// 	}
// ]);

// //Insert user roles
// db.User_Role.bulkCreate([
// 	{
// 		name: 'user'
// 	},
// 	{
// 		name: 'parking-owner'
// 	},
// 	{
// 		name: 'admin'
// 	}
// ]);

// async function test2(){
// 	///let parking = await db.Parking.findOne({where: {name: 'parking3'}});
// 	// let ps = await db.Parking_Space.findAll({where: {parkingID: parking.id}});

// 	// console.log(ps);
// 	let parkings = await db.Parking.findOne();
// 	res.render('viewParking', {
// 		test: parkings.name
// 	});
// 	parkings.forEach(parking => console.log(parking.name));
// };
// //test2();
