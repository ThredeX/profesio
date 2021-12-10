'use strict'
module.exports = (sequelize, DataTypes) => {
	const Administrator = sequelize.define(
		'Administrator',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			can_edit: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			user_id: {
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

	Administrator.associate = function (models) {
		Administrator.belongsTo(models.User, {
			foreignKey: 'user_id',
			target: 'id',
		})
	}

	return Administrator
}
