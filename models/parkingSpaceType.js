module.exports = (sequelize, DataTypes) =>{
	const Parking_Space_Type = sequelize.define('Parking_Space_Type',{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Parking_Space_Type'
	});
	return Parking_Space_Type;
}