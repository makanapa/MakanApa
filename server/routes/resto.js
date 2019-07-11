const router= require('express').Router()
const restoController= require('../controllers/restoController')

router.get('/city/:city', restoController.getAllResto)
router.get('/:id', restoController.getDetail)

module.exports= router