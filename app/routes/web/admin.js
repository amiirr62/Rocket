const express = require('express')
const router = express.Router()
const adminController = require('./../../../app/http/controllers/AdminController')

router.get('/', adminController.index)

router.use('/course',adminController.course)


module.exports = router