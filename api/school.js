const router = require('express').Router()
const {
	Faculty,
	Building,
	School,
	Subject,
	Lecture,
	Participation,
	Teacher,
	User,
	Student,
	Room
} = require('../models')

const UserChecker = require('../utils/userChecker.js')
const { toDB } = require('../utils/lectureParser.js')

router.get('/info', async (req, res) => {
	const school = await School.findOne()
	res.json(school.toJSON())
})

router.post('/timetableend', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const school = await School.findOne()
	await school.update(req.body)
	res.status(200).json({ message: 'School time table close time updated' })
})

router.post('/info', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const school = await School.findOne()
	await school.update(req.body)
	res.status(200).json({ message: 'School info updated' })
})

router.get('/subject', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const subjects = await Subject.findAll()
	res.json(subjects.map(sub => sub.toJSON()))
})

router.post('/subject', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	await Subject.create(req.body)
	res.status(200).json({ message: 'Subject created' })
})

router.delete('/subject/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const subject = await Subject.findByPk(req.params.id)
	await subject.destroy()
	res.status(200).json({ message: 'Subject deleted' })
})

router.post('/lecture', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	await Lecture.destroy({
		where: {
			RoomId: parseInt(req.body.subjects[0][0]['RoomId']),
		},
	})
	await toDB(req.body)
	res.status(200).json({ message: 'Lecture created' })
})

router.get('/lecture', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const student = await Student.findByPk(req.session.user.student.id)
	const lect = await student.getLectures({
		include: [
			Subject,
			Room,
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
	let lectures = await Lecture.findAll({
		include: [
			Subject,
			Room,
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
	const allLectures = lectures.map(lecture => lecture.toJSON())
	for (let i = 0; i < allLectures.length; i++) {
		let amount = await Participation.count({
			where: {
				LectureId: allLectures[i].id,
			},
		})
		console.log(allLectures[i]);
		if (amount >= allLectures[i].Room.capacity) allLectures[i]['full'] = true
		for (let j = 0; j < lect.length; j++) {
			if (allLectures[i].id === lect[j].id) {
				allLectures[i]['attending'] = true
			}
		}
	}
	res.status(200).json(allLectures)
})

router.post('/lecture/:id', async (req, res) => {
	if (!UserChecker.isStudent(req.session.user)) return res.status(401).send()
	console.log(req.session.user.student.id, parseInt(req.params.id))
	await Participation.create({
		StudentId: req.session.user.student.id,
		LectureId: parseInt(req.params.id),
	})
	res.status(200)
})

router.delete('/lecture/:id', async (req, res) => {
	if (!UserChecker.isStudent(req.session.user)) return res.status(401).send()
	const parc = await Participation.findOne({
		where: {
			StudentId: req.session.user.student.id,
			LectureId: parseInt(req.params.id),
		},
	})
	await parc.destroy()
	res.status(200)
})

router.get('/building', async (req, res) => {
	if (!UserChecker.doesExist(req.session.user)) return res.status(401).send()
	const buildings = await Building.findAll()
	res.status(200).json(buildings.map(b => b.toJSON()))
})

router.post('/building', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const faculty = await Faculty.findByPk(req.body.id)
	await faculty.createBuilding({ address: req.body.address })
	res.status(200).json({ message: 'Building created' })
})

router.delete('/building/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const building = await Building.findByPk(req.params.id)
	if (!building) return res.status(404).send()
	await building.destroy()
	res.status(200).json({ message: 'Building destroyed' })
})

module.exports = router
