const express = require('express')
const router = express.Router()

const authRouter = require('./auth.js')
const userRouter = require('./users.js')
const schoolRouter = require('./school.js')
const factulyRouter = require('./faculty.js')

router.use(express.json())

router.use('/users', userRouter)
router.use('/school', schoolRouter)
router.use('/faculty', factulyRouter)
router.use('/auth', authRouter)

module.exports = router
