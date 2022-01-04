const router = require('express').Router()

const User = require('../models/').User

// Return logged in user
router.get('/me', async (req, res) => {
	try {
		res.json(req.session.user)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// Login route using sessions
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	try {
		const user = await User.findOne({ where: { username } })
		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}
		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}
		req.session.user = {
			id: user.id,
			username: user.username,
		}
		res.json({ user: user.toJSON() })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
