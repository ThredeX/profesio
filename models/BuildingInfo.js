'use strict'
module.exports = (sequelize, DataTypes) => {
	const BuildingInfo = sequelize.define(
		'BuildingInfo',
		{
			building_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
			faculty_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			paranoid: true,
			freezeTableName: true,
		},
	)

	BuildingInfo.associate = function (models) {
		BuildingInfo.belongsTo(models.Building, {
			foreignKey: 'building_id',
			target: 'id',
		})

		BuildingInfo.belongsTo(models.Faculty, {
			foreignKey: 'faculty_id',
			target: 'id',
		})
	}

	return BuildingInfo
}
