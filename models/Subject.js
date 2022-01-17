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
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
	)

	Subject.associate = function (models) {
		Subject.belongsTo(models.Teacher)
		Subject.hasOne(models.Lecture)
	}

	return Subject
}
