module.exports = (sequelize, DataTypes) => {
	const Participation = sequelize.define(
		'Participation',
		{},
		{
			timestamps: true,
			freezeTableName: true,
		},
	)
	return Participation
}
