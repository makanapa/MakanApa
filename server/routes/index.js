const router= require('express').Router()
const userRoute= require('./user')
const nutritionRoute = require('./nutrition')

router.use('/users', userRoute)
router.use('/nutritions', nutritionRoute)

module.exports= router