const express = require('express')
const Settings = require('../models').Settings
const router = express.Router()

const userRouter = require('./users')

router.use('/users', userRouter)

router.all('*', async (req, res) => {
	console.log(await Settings.findAll())
	res.send('You just Hit the API endpoint!')
})

module.exports = router
