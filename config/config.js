module.exports = {
	development: {
		username: 'root',
		password: null,
		database: 'profesio',
		host: ':memory:',
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
