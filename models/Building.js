'use strict'
module.exports = (sequelize, DataTypes) => {
	const Building = sequelize.define(
		'Building',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
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
