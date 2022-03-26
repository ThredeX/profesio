module.exports = {
	development: {
		username: 'root',
		password: null,
		database: 'profesio',
		host: 'db.sqlite',
		dialect: 'sqlite',
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'postgres',
	},
}
