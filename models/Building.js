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
			address: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		},
	)

	Building.associate = function (models) {
		Building.belongsToMany(models.Faculty, { through: 'BuildingInfo' })
		Building.hasOne(models.Room)
	}

	return Building
}
