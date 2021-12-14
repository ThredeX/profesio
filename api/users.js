const router = require('express').Router()
const usergen = require('../utils/usergen')

const User = require('../models').User
const Student = require('../models').Student
const Teacher = require('../models').Teacher
const Administrator = require('../models').Administrator

// AUTHENTICATION REQUIRED
// Get all users in the database
router.get('/info', async (req, res) => {
	try {
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
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// AUTHENTICATION REQUIRED
// Create a new student in the database
router.post('/student', async (req, res) => {
	try {
		const user = await usergen(req.body)
		await user.createStudent({ entry_year: req.body.entry_year })
		res.status(204).json({
			message: 'User created',
		})
	} catch (error) {
		console.error(error)
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Create a new teacher in the database
router.post('/teacher', async (req, res) => {
	try {
		const user = await usergen(req.body)
		await user.createTeacher()
		res.status(204).json({
			message: 'User created',
		})
	} catch (error) {
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Create a new administrator in the database
router.post('/administrator', async (req, res) => {
	try {
		const user = await usergen(req.body)
		await user.createAdministrator({ can_edit: req.body.can_edit })
	} catch (error) {
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Delete a user from the database by id
router.delete('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		res.status(204).json({
			message: 'User deleted',
		})
		await user.destroy()
	} catch (error) {
		res.status(500).send(error)
	}
})

// AUTHENTICATION REQUIRED
// Update a user in the database by id
router.post('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		await user.update(req.body)
		res.status(204).json({
			message: 'User updated',
		})
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
