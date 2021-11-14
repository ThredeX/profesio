const express = require('express')
const Nastaveni = require('../models').Setting
const router = express.Router()

router.all('*', async (req, res) => {
	console.log(await Setting.findAll())
	res.send('You just Hit the API endpoint!')
})

module.exports = router
