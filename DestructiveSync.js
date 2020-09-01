const db = require('./models');

// db.sequelize.sync({force: true}).then(() => {
// 	//require('./models/users').sync({force: true});
// 	// require('./models/users').build({
// 	// 	firstName: "Pesho", 
// 	// 	lastName: "Peshov", 
// 	// 	birthDate: "1996-01-05",
// 	// 	email: "pesho@abv.bg",
// 	// 	password: "asd",
// 	// 	role: "1"
// 	// }).save();
// }).catch();

//Insert parking
// db.Parking.build({
// 	name: 'parking1',
// 	address: 'address1'
// }).save();

//Insert parking spaces
async function test(){
	var parking = await db.Parking.findOne({where: {name: 'parking1'}});
	for(i = 0; i < 10; i++){
		db.Parking_Space.build({
			spaceNumber: parking.name + "_" + (i + 1),
			parkingID: parking.id
		}).save();
	}
};
test();

//Insert parking space types
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
