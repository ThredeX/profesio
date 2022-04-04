'use strict'
module.exports = (sequelize, DataTypes) => {
	const Room = sequelize.define(
		'Room',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			label: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			capacity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		},
	)

	Room.associate = function (models) {
		Room.hasOne(models.Lecture)
		Room.belongsTo(models.Building)
	}

	return Room
}
