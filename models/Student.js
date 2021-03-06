'use strict'
module.exports = (sequelize, DataTypes) => {
	const Student = sequelize.define(
		'Student',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			entry_year: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		},
	)

	Student.associate = function (models) {
		Student.belongsTo(models.Specialization)
		Student.belongsTo(models.User)
		Student.belongsToMany(models.Lecture, { through: models.Participation })
	}

	return Student
}
