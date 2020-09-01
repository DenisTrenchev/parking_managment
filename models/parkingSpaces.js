module.exports = (sequelize, DataTypes) =>{
	const Parking_Space = sequelize.define('Parking_Space',{
		spaceNumber: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Parking_Spaces'
	});

	Parking_Space.associate = models => {
		Parking_Space.belongsTo(models.Parking_Space_Type, {
			foreignKey:{
				name: 'parkingSpaceTypeID',
				//allowNull: false
			}
		});
		Parking_Space.belongsTo(models.User, {
			foreignKey:{
				name: 'userID'
			}
		});
		Parking_Space.belongsTo(models.Parking, {
			foreignKey:{
				name: 'parkingID',
				allowNull: false
			}
		});
	}
	return Parking_Space;
}