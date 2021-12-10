'use strict'
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			surname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			telephone_number: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
		
	)
	User.associate = function (models) {
        User.hasOne(models.Student)
        User.hasOne(models.Teacher)
        User.hasOne(models.Administrator)
    }

	return User
}
