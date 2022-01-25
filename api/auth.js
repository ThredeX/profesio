const router = require('express').Router()

const { User, Administrator, Student, Teacher } = require('../models/')
const parseUser = require('../utils/parseUser.js')
const UserChecker = require('../utils/userChecker.js')

router.get('/me', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user))
		return res.status(401).json({ message: 'Not logged in!' })
	return res.json(req.session.user)
})

router.post('/password', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user))
		return res.status(401).json({ message: 'Not logged in!' })
	const user = await User.findByPk(req.session.user.id)
	user.password = req.body.password
	await user.save()
	return res.json({ message: 'Password changed!' })
})

router.post('/password/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user))
		return res.status(401).json({ message: 'Not logged in!' })
	const user = await User.findByPk(req.params.id)
	user.password = req.body.password
	await user.save()
	return res.json({ message: 'Password changed!' })
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({
		where: { username },
		attributes: ['username', 'password'],
	})

	if (!user) return res.status(401).json({ error: 'Invalid credentials' })

	const isPasswordValid = await user.comparePassword(password)
	if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' })

	const userData = await User.findOne({
		where: { username },
		include: [Administrator, Teacher, Student],
		attributes: ['username', 'email', 'name', 'surname'],
	})
	req.session.user = parseUser(userData.toJSON())
	res.status(200).json({ message: 'Successfull Login!' })
})

router.post('/logout', async (req, res) => {
	req.session.destroy()
	res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = router
