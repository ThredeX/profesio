const express = require('express')
const next = require('next')
const sessions = require('express-session')
const apiRouter = require('./api/')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const sequelize = require('./models').sequelize
const handle = app.getRequestHandler()

app.prepare().then(() => {
	sequelize.sync({ force: true }).then(() => {
		const server = express()

		server.use(
			sessions({
				secret: process.env.SESSION_SECRET,
				resave: false,
				saveUninitialized: false,
				cookie: {
					maxAge: 86400000, // 1 day in milliseconds
					httpOnly: true,
				},
			}),
		)
		server.use('/api', apiRouter)

		server.all('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(port, async err => {
			if (err) throw err
			if (dev) {
				const usergen = require('./utils/usergen.js')
				const [defaultDevAdmin, pw] = await usergen(
					{
						email: 'werfmon@thredex.eu',
						name: 'dominik',
						surname: 'vyroubal',
					},
					'a'
				)
				console.log(pw)
				await defaultDevAdmin.createAdministrator({ can_edit: true })
			}
			console.log(`> Ready on http://localhost:${port}`)
		})
	})
})
