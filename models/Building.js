'use strict'
module.exports = (sequelize, DataTypes) => {
	const Building = sequelize.define(
		'Building',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			adress: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
	)

	return Building
}
