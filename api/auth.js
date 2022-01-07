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
		switch (user.username[-1]) {
			case 's':
				req.session.user.student = await user.getStudent().toJSON()
			case 't':
				req.session.user.teacher = await user.getTeacher().toJSON()
			case 'a':
				req.session.user.administrator = await user.getAdministrator().toJSON()
		}
		res.status(200).json({ message: 'Successfull Login!' })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

router.post('/logout', async (req, res) => {
	res.session.destroy()
	res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = router
