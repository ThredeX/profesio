'use strict'
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			surname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			telephone_number: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
			hooks: {
				beforeCreate: async (user, options) => {
					const salt = await bcrypt.genSalt(10)
					const passwordHash = await bcrypt.hash(user.password, salt)
					user.password = passwordHash
				},
				beforeUpdate: async (user, options) => {
					const salt = await bcrypt.genSalt(10)
					const passwordHash = await bcrypt.hash(user.password, salt)
					user.password = passwordHash
				},
			},
			instanceMethods: {
				comparePassword: function (password) {
					return bcrypt.compare(password, this.password)
				},
			},
		},
	)
	User.associate = function (models) {
		User.hasOne(models.Student)
		User.hasOne(models.Teacher)
		User.hasOne(models.Administrator)
	}
	User.prototype.comparePassword = function (password) {
		return bcrypt.compare(password, this.password)
	}
	return User
}
