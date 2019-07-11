const router= require('express').Router()
const userRoute= require('./user')
const nutritionRoute = require('./nutrition')
const restoRoute= require('./resto')

router.use('/users', userRoute)
router.use('/nutritions', nutritionRoute)
router.use('/resto', restoRoute)

module.exports= router