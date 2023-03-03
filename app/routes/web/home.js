
const express = require('express')
const router = express.Router()
const homeController = require('../../../app/http/controllers/HomeController')

router.get('/', homeController.index)

router.use('/course',homeController.course)

module.exports = router