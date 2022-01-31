module.exports = (sequelize, DataTypes) => {
	const Participation = sequelize.define(
		'Participation',
		{},
		{
			timestamps: true,
			paranoid: true,
			freezeTableName: true,
		},
	)
	return Participation
}
