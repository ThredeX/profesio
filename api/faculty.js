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

module.exports = router
