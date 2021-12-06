'use strict'
module.exports = (sequelize, DataTypes) => {
	const Specialization = sequelize.define(
		'Specialization',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			faculty_id: {
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

	Specialization.associate = function (models) {
		Specialization.belongsTo(models.Faculty, {
			foreignKey: 'faculty_id',
			target: 'id',
		})
	}

	return Specialization
}
