const router= require('express').Router()
const userRoute= require('./user')
const restoRoute= require('./resto')

router.use('/users', userRoute)
router.use('/resto', restoRoute)

module.exports= router