'use strict'
module.exports = (sequelize, DataTypes) => {
	const Lecture = sequelize.define(
		'Lecture',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
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
			subject_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			teacher_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			room_id: {
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

	Lecture.associate = function (models) {
		Lecture.belongsTo(models.Subject, {
			foreignKey: 'subject_id',
			target: 'id',
		})

		Lecture.belongsTo(models.Teacher, {
			foreignKey: 'teacher_id',
			target: 'id',
		})

		Lecture.belongsTo(models.Room, {
			foreignKey: 'room_id',
			target: 'id',
		})
	}

	return Lecture
}
