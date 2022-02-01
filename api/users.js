const router = require('express').Router()
const usergen = require('../utils/usergen')
const UserChecker = require('../utils/userChecker.js')

const User = require('../models').User
const Student = require('../models').Student
const Teacher = require('../models').Teacher
const Administrator = require('../models').Administrator

router.get('/info', async (req, res) => {
	if (!UserChecker.isAdmin(req.session.user)) return res.status(401).send()

	const students = await Student.findAll({
		attributes: { exclude: ['password'] },
		include: [
			{
				model: User,
				attributes: [
					'id',
					'username',
					'name',
					'surname',
					'email',
					'telephone_number',
				],
			},
		],
	})
	const teachers = await Teacher.findAll({
		attributes: { exclude: ['password'] },
		include: [
			{
				model: User,
				attributes: [
					'id',
					'username',
					'name',
					'surname',
					'email',
					'telephone_number',
				],
			},
		],
	})
	const administrators = await Administrator.findAll({
		attributes: { exclude: ['password'] },
		include: [
			{
				model: User,
				attributes: [
					'id',
					'username',
					'name',
					'surname',
					'email',
					'telephone_number',
				],
			},
		],
	})
	res.json({
		students: students.map(student => student.toJSON()),
		teachers: teachers.map(teacher => teacher.toJSON()),
		administrators: administrators.map(administrator => administrator.toJSON()),
	})
})

router.post('/student', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await usergen(req.body, 's')
	await user.createStudent({ entry_year: req.body.entry_year })
	res.json({
		username: user.username,
		password: pw,
	})
})

router.post('/teacher', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await usergen(req.body, 't')
	await user.createTeacher()
	res.json({
		username: user.username,
		password: pw,
	})
})

router.post('/administrator', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await usergen(req.body, 'a')
	await user.createAdministrator({ can_edit: req.body.can_edit })
	res.json({
		username: user.username,
		password: pw,
	})
})

router.delete('/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const user = await User.findByPk(req.params.id)
	await user.destroy()
	res.json({
		message: 'User deleted',
	})
})

router.post('/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const user = await User.findByPk(req.params.id)
	await user.update(req.body)
	res.json({
		message: 'User updated',
	})
})

module.exports = router
