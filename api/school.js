const router = require('express').Router()
const School = require('../models').School
const Subject = require('../models').Subject

const UserChecker = require('../utils/userChecker.js')

// Get all schools info
router.get('/info', async (req, res) => {
	const school = await School.findOne()
	res.json(school.toJSON())
})

// AUTHENTICATION REQUIRED
// Update school timetable closing time to date
router.post('/timetableend', async (req, res) => {
	try {
		if (!UserChecker.canEdit(req.session.user)) return res.status(401)
		const school = await School.findOne()
		await school.update(req.body)
		res.status(200).json({ message: 'School time table close time updated' })
	} catch (error) {
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Update school info
router.post('/info', async (req, res) => {
	try {
		if (!UserChecker.canEdit(req.session.user)) return res.status(401)
		const school = await School.findOne()
		await school.update(req.body)
		res.status(200).json({ message: 'School info updated' })
	} catch (error) {
		res.status(500).send(error)
	}
})

// Return all subjects
router.get('/subject', async (req, res) => {
	const subjects = await Subject.findAll()
	res.json(subjects.map(sub => sub.toJSON()))
})

// AUTHENTICATION REQUIRED
// Add new subject
router.post('/subject', async (req, res) => {
	try {
		if (!UserChecker.canEdit(req.session.user)) return res.status(401)
		await Subject.create(req.body)
		res.status(200).json({ message: 'Subject created' })
	} catch (error) {
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Delete subject
router.delete('/subject/:id', async (req, res) => {
	try {
		if (!UserChecker.canEdit(req.session.user)) return res.status(401)
		const subject = await Subject.findByPk(req.params.id)
		await subject.destroy()
		res.status(200).json({ message: 'Subject deleted' })
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
