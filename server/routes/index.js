const router= require('express').Router()
const userRoute= require('./user')
const nutritionRoute = require('./nutrition')
const restoRoute= require('./resto')
const weatherRoute = require('./weather')

router.use('/users', userRoute)
router.use('/nutritions', nutritionRoute)
router.use('/resto', restoRoute)
router.use('/weathers', weatherRoute)

module.exports= router