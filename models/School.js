'use strict'
module.exports = (sequelize, DataTypes) => {
	const School = sequelize.define(
		'School',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
			adress: {
				type: DataTypes.STRING,
			},
			website: {
				type: DataTypes.STRING,
			},
			settings_id: {
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

	School.associate = function (models) {
		School.belongsTo(models.Settings, {
			foreignKey: 'settings_id',
			target: 'id',
		})
	}

	return School
}
