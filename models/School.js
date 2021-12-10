'use strict'
module.exports = (sequelize, DataTypes) => {
	const School = sequelize.define(
		'School',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			adress: {
				type: DataTypes.STRING,
			},
			website: {
				type: DataTypes.STRING,
			},
			timetable_end: {
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

	return School
}
