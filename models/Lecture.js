'use strict'
module.exports = (sequelize, DataTypes) => {
	const Lecture = sequelize.define(
		'Lecture',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			topic: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			beginning: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			end: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Lecture.associate = function (models) {
		Lecture.belongsTo(models.Subject)
		Lecture.belongsTo(models.Teacher)
		Lecture.belongsTo(models.Room)
		Lecture.belongsTo(models.Faculty)
		Lecture.belongsToMany(models.Student, { through: models.Participation })
	}

	return Lecture
}
