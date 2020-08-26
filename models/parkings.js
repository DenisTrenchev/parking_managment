module.exports = (sequelize, DataTypes) =>{
	const Parking = sequelize.define('Parking',{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Parkings'
	});
	return Parking;
}