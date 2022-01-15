const router = require('express').Router()

const { Faculty, Lecture } = require('../models/')
const UserChecker = require('../utils/userChecker.js')

// Returns all faculties
router.get('/', async (req, res) => {
	const faculties = await Faculty.findAll()
	res.json(faculties.map(faculty => faculty.toJSON()))
})

// AUTHENTICATION REQUIRED
// Create a new faculty
router.post('/', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	await Faculty.create(req.body)
	res.status(204).json({ message: 'Faculty created' })
})

// AUTHENTICATION REQUIRED
// Remove a faculty by id
router.delete('/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const faculty = await Faculty.findByPk(req.params.id)
	await faculty.destroy()
	res.status(204).json({ message: 'Faculty deleted' })
})

router.get('/room/:id', async (req, res) => {
	if (UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const lect = await Lecture.findAll({
		where: {
			RoomId: req.params.id,
		},
	})
	res.json(lect.map(l => l.toJSON()))
})

router.get('/teacher/:id', async (req, res) => {
	if (UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const lect = await Lecture.findAll({
		where: {
			TeacherId: req.params.id,
		},
	})
	res.json(lect.map(l => l.toJSON()))
})

module.exports = router
