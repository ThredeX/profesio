const router = require('express').Router()

const {
	Faculty,
	Lecture,
	Room,
	Subject,
	Teacher,
	User,
	Building,
	Student,
	Participation,
} = require('../models/')
const UserChecker = require('../utils/userChecker.js')
const { fromDB } = require('../utils/lectureParser.js')

router.get('/', async (req, res) => {
	const faculties = await Faculty.findAll()
	res.json(faculties.map(faculty => faculty.toJSON()))
})

router.post('/', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	await Faculty.create(req.body)
	res.status(204).json({ message: 'Faculty created' })
})

router.delete('/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const faculty = await Faculty.findByPk(req.params.id)
	await faculty.destroy()
	res.status(204).json({ message: 'Faculty deleted' })
})

router.get('/room', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const rooms = await Room.findAll()
	res.json(rooms.map(r => r.toJSON()))
})

router.post('/room', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	await Room.create(req.body)
	res.status(204).json({ message: 'Room created' })
})

router.delete('/room/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const room = await Room.findByPk(req.params.id)
	await room.destroy()
	res.status(204).json({ message: 'Room deleted' })
})

router.get('/room/:id', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const lect = await Lecture.findAll({
		where: {
			RoomId: parseInt(req.params.id),
		},
		include: [
			{
				model: Subject,
			},
			{
				model: Teacher,
				include: [
					{
						model: User,
						attributes: ['surname'],
					},
				],
			},
		],
	})
	res.json(fromDB(lect.map(l => l.toJSON())))
})

router.get('/teacher', async (req, res) => {
	if (!UserChecker.isTeacher(req.session.user)) return res.status(401).send()
	const lect = await Lecture.findAll({
		where: {
			TeacherId: req.session.user.teacher.id,
		},
		include: [Subject, Faculty, { model: Room, include: Building }],
	})
	res.json(fromDB(lect.map(l => l.toJSON())))
})

router.get('/student', async (req, res) => {
	if (!UserChecker.isStudent(req.session.user)) return res.status(401).send()
	const student = await Student.findByPk(req.session.user.student.id)
	const lect = await student.getLectures({
					include: [Subject, Faculty, {
						model: Teacher,
						include: [
							{
								model: User,
								attributes: ['surname'],
							},
						],
					}, { model: Room, include: Building }],
	})
	// const lect = await Participation.findAll({
	// 	where: {
	// 		StudentId: req.session.user.student.id,
	// 	},
	// 	include: [
	// 		{
	// 			model: Lecture,
	// 			include: [Subject, Faculty, { model: Room, include: Building }],
	// 		},
	// 	],
	// })
	
	console.log(lect);
	res.json(fromDB(lect.map(l => l.toJSON())))
})

module.exports = router