const router = require('express').Router()

const Faculty = require('../models/').Faculty

// Returns all faculties
router.get('/', async (req, res) => {
	try {
		const faculties = await Faculty.findAll()
		res.json(faculties.toJSON())
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// AUTHENTICATION REQUIRED
// Create a new faculty
router.post('/', async (req, res) => {
	try {
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
		const faculty = await Faculty.findByPk(req.params.id)
		await faculty.destroy()
		res.status(204).json({ message: 'Faculty deleted' })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
