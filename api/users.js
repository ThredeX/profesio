const router = require('express').Router()
const usergen = require('../utils/usergen')
const UserChecker = require('../utils/userChecker.js')

const User = require('../models').User
const Student = require('../models').Student
const Teacher = require('../models').Teacher
const Administrator = require('../models').Administrator

// AUTHENTICATION REQUIRED
// Get all users in the database
router.get('/info', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()

	const students = await Student.findAll({
		attributes: { exclude: ['password'] },
		include: [User],
	})
	const teachers = await Teacher.findAll({
		attributes: { exclude: ['password'] },
		include: [User],
	})
	const administrators = await Administrator.findAll({
		attributes: { exclude: ['password'] },
		include: [User],
	})
	res.json({
		students: students.map(student => student.toJSON()),
		teachers: teachers.map(teacher => teacher.toJSON()),
		administrators: administrators.map(administrator => administrator.toJSON()),
	})
})

// AUTHENTICATION REQUIRED
// Create a new student in the database
router.post('/student', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await usergen(req.body, 's')
	await user.createStudent({ entry_year: req.body.entry_year })
	res.status(204).json({
		username: user.username,
		password: pw,
	})
})

// AUTHENTICATION REQUIRED
// Create a new teacher in the database
router.post('/teacher', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await usergen(req.body, 't')
	await user.createTeacher()
	res.status(204).json({
		username: user.username,
		password: pw,
	})
})

// AUTHENTICATION REQUIRED
// Create a new administrator in the database
router.post('/administrator', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await usergen(req.body, 'a')
	await user.createAdministrator({ can_edit: req.body.can_edit })
	res.status(204).json({
		username: user.username,
		password: pw,
	})
})

// AUTHENTICATION REQUIRED
// Delete a user from the database by id
router.delete('/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const user = await User.findByPk(req.params.id)
	await user.destroy()
	res.status(204).json({
		message: 'User deleted',
	})
})

// AUTHENTICATION REQUIRED
// Update a user in the database by id
router.post('/:id', async (req, res) => {
	if (!UserChecker.canEdit(req.session.user)) return res.status(401).send()
	const [user, pw] = await User.findByPk(req.params.id)
	await user.update(req.body)
	res.status(204).json({
		message: 'User updated',
	})
})

module.exports = router
