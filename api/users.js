const router = require('express').Router()
const User = require('../models').User

// AUTHENTICATION REQUIRED
// Get all users in the database
router.get('/info', async (req, res) => {
	const users = await User.findAll()
	res.json(users.toJSON())
})

// AUTHENTICATION REQUIRED
// Delete a user from the database by id
router.delete('/:id', async (req, res) => {
	const user = await User.findByPk(req.params.id)
	if (!user)
		return res.status(404).json({
			message: 'User does not exist',
		})

	await user.destroy()
	res.status(204).json({
		message: 'User deleted',
	})
})

module.exports = router
