const router = require('express').Router()
const School = require('../models').School

// Get all schools info
router.get('/info', async (req, res) => {
	const school = await School.findAll()
	res.json(school.toJSON())
})

// AUTHENTICATION REQUIRED
// Update school timetable closing time to date
router.post('/timetableend', async (req, res) => {
	const { date } = req.body
	try {
		const school = await School.findOne()
		await school.update({ timetable_end: date })
		res.status(200).json({ message: 'School time table close time updated' })
	} catch (error) {
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Update school info
router.post('/info', async (req, res) => {
	const { adress, website } = req.body
	try {
		const school = await School.findOne()
		await school.update({ adress, website })
		res.status(200).json({ message: 'School info updated' })
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
