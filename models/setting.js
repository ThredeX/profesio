'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = sequelize => {
	class Setting extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Nastaveni.init(
		{
			uzavreni: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Setting',
		},
	)
	return Setting
}
