const express = require('express')

const router = express.Router()

router.all('*', (req, res) => {
	console.log(req.url)
	res.send('You just Hit the API endpoint!')
})

module.exports = router
