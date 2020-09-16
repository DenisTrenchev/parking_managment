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

	Parking.associate = models =>{
		Parking.belongsTo(models.User, {
			foreignKey:{
				name: 'userID',
				allowNull: false
			}
		});
	}
	return Parking;
}