module.exports = {
	development: {
		username: 'root',
		password: null,
		database: 'profesio',
		host: 'db.sqlite',
		dialect: 'sqlite',
	},
	production: {
		username: 'postgres',
		password: 'postgres',
		database: 'postgres',
		host: 'db',
		dialect: 'postgres',
	},
}
