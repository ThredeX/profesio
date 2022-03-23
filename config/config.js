module.exports = {
	development: {
		username: 'root',
		password: null,
		database: 'profesio',
		host: 'db.sqlite',
		dialect: 'sqlite',
	},
	production: {
		username: procces.env.DB_USERNAME,
		password: procces.env.DB_PASSWORD,
		database: procces.env.DB_DATABASE,
		host: procces.env.DB_HOST,
		dialect: 'postgres',
	},
}
