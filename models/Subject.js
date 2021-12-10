'use strict'
module.exports = (sequelize, DataTypes) => {
	const Subject = sequelize.define(
		'Subject',
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
			short: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			teacher_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Subject.associate = function (models) {
		Subject.belongsTo(models.Teacher, {
			foreignKey: 'teacher_id',
			target: 'id',
		})
	}

	return Subject
}
