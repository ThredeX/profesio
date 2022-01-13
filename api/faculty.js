const router = require('express').Router()

const Faculty = require('../models/').Faculty
const UserChecker = require('../utils/userChecker.js')

// Returns all faculties
router.get('/', async (req, res) => {
	try {
		const faculties = await Faculty.findAll()
		res.json(faculties.map(faculty => faculty.toJSON()))
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// AUTHENTICATION REQUIRED
// Create a new faculty
router.post('/', async (req, res) => {
	try {
		if (!UserChecker.canEdit(req.session.user)) return res.status(401)
		await Faculty.create(req.body)
		res.status(204).json({ message: 'Faculty created' })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// AUTHENTICATION REQUIRED
// Remove a faculty by id
router.delete('/:id', async (req, res) => {
	try {
		if (!UserChecker.canEdit(req.session.user)) return res.status(401)
		const faculty = await Faculty.findByPk(req.params.id)
		await faculty.destroy()
		res.status(204).json({ message: 'Faculty deleted' })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
