'use strict'
module.exports = (sequelize, DataTypes) => {
	const Specialization = sequelize.define(
		'Specialization',
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
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		},
	)

	Specialization.associate = function (models) {
		Specialization.hasOne(models.Student)
		//Specialization.belongsTo(models.Faculty)
	}

	return Specialization
}
