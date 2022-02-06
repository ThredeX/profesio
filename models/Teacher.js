'use strict'
module.exports = (sequelize, DataTypes) => {
	const Teacher = sequelize.define(
		'Teacher',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		},
	)

	Teacher.associate = function (models) {
		Teacher.belongsTo(models.User)
		Teacher.hasOne(models.Subject)
		Teacher.hasOne(models.Lecture)
	}

	return Teacher
}
