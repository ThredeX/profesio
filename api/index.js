const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const schoolRouter = require('./school')
const factulyRouter = require('./faculty')

router.use(express.json())

router.use('/users', userRouter)
router.use('/school', schoolRouter)
router.use('/faculty', factulyRouter)

router.all('*', (req, res) => {
	res.send('You just Hit the API endpoint!')
})

module.exports = router
