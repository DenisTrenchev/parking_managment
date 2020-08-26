module.exports = (sequelize, DataTypes) =>{
	const Car = sequelize.define('Car',{
		brand: {
			type: DataTypes.STRING,
			allowNull: false
		},
		model: {
			type: DataTypes.STRING,
			allowNull: false
		},
		licensePlate: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Cars'
	});

	Car.associate = models => {
		Car.belongsTo(models.User, {
			foreignKey:{
				name: 'userID',
				allowNull: false
			}
		});
	}
	return Car;
}