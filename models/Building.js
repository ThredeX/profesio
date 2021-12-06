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
			school_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Building.associate = function (models) {
		Building.belongsTo(models.School, {
			foreignKey: 'school_id',
			target: 'id',
		})
	}

	return Building
}
