'use strict'
module.exports = (sequelize, DataTypes) => {
	const Settings = sequelize.define(
		'Settings',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
			closing_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		},
	)

	return Settings
}
