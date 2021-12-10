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
			building_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Room.associate = function (models) {
		Room.belongsTo(models.Building, {
			foreignKey: 'building_id',
			target: 'id',
		})
	}

	return Room
}
