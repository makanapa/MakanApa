const router = require('express').Router()
const NutritionController = require('../controllers/nutritionController')

router.get('/', NutritionController.getNutrition)

module.exports = router