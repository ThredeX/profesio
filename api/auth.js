const router = require('express').Router()

const { User, Administrator: ad, Student: st, Teacher: tch } = require('../models/')

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
		const user = await User.findOne({
			where: { username },
			include: [ad, tch, st],
		})
		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}
		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}
		const {
			username: uname,
			email,
			name,
			surname,
			Administrator: administrator,
			Teacher: teacher,
			Student: student,
		} = user.toJSON()
		req.session.user = {
			username: uname,
			email,
			name,
			surname,
			administrator,
			teacher,
			student,
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
