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
			specialization_id: {
				type: DataTypes.UUID,
			},
			user_id: {
				type: DataTypes.UUID,
			},
		},
		{
			timestamps: false,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Student.associate = function (models) {
		Student.belongsTo(models.Specialization, {
			foreignKey: 'specialization_id',
			target: 'id',
		})

		Student.belongsTo(models.User, {
			foreignKey: 'user_id',
			target: 'id',
		})
	}

	return Student
}
