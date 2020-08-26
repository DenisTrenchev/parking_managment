module.exports = (sequelize, DataTypes) =>{
	const User_Role = sequelize.define('User_Role',{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'User_Roles'
	});
	return User_Role;
}
