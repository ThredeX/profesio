'use strict'
module.exports = (sequelize, DataTypes) => {
	const Faculty = sequelize.define(
		'Faculty',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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

	Faculty.associate = function (models) {
		//Faculty.hasOne(models.Specialization)
		Faculty.hasOne(models.Lecture)
		Faculty.belongsToMany(models.Building, { through: 'BuildingInfo' })
	}

	return Faculty
}
