'use strict'
module.exports = (sequelize, DataTypes) => {
	const Faculty = sequelize.define(
		'Faculty',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			shortcut: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			paranoid: true,
			freezeTableName: true,
		},
	)

	return Faculty
}