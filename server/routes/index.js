const router= require('express').Router()
const userRoute= require('./user')
const nutritionRoute = require('./nutrition')
const restoRoute= require('./resto')
const wheatherRoute = require('./wheather')

router.use('/users', userRoute)
router.use('/nutritions', nutritionRoute)
router.use('/resto', restoRoute)
router.use('/wheathers', wheatherRoute)

module.exports= router