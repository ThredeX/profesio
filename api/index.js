const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const schoolRouter = require('./school')

router.use(express.json())

router.use('/users', userRouter)
router.use('/school', schoolRouter)

router.all('*', async (req, res) => {
	res.send('You just Hit the API endpoint!')
})

module.exports = router
