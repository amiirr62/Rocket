
const express = require('express')
const router = express.Router()
const homeController = require('../../../app/http/controllers/HomeController')
const authController = require ('../../http/controllers/auth/authController')
const authValidator = require('../../http/validators/auth/auth')

router.get('/', homeController.index)
router.get('/course',homeController.course)
router.get('/login',authController.showLoginForm)
router.get('/register',authController.showRegisterForm)
router.post('/register',authValidator.register(),authController.registerProcess)



module.exports = router