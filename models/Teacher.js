'use strict'
module.exports = (sequelize, DataTypes) => {
	const Teacher = sequelize.define(
		'Teacher',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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

	Teacher.associate = function (models) {
		Teacher.belongsTo(models.User, {
			foreignKey: 'user_id',
			target: 'id',
		})
	}

	return Teacher
}
