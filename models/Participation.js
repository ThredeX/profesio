'use strict'
module.exports = (sequelize, DataTypes) => {
	const Participation = sequelize.define(
		'Participation',
		{
			student_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
			lecture_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Participation.associate = function (models) {
		Participation.belongsTo(models.Student, {
			foreignKey: 'student_id',
			target: 'id',
		})

		Participation.belongsTo(models.Lecture, {
			foreignKey: 'lecture_id',
			target: 'id',
		})
	}

	return Participation
}
