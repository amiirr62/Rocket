
const express = require('express')
const router = express.Router()
const homeController = require('../../http/controllers/HomeController')
const authController = require ('../../http/controllers/auth/authController')
const authValidator = require('../../http/validators/auth/auth')
const dashboardController = require ('../../http/controllers/dashboard/dashboardController')

router.get('/', homeController.index)
router.get('/course',homeController.course)

router.get('/login',authController.showLoginForm)
router.post('/login',authValidator.login(),authController.login)

router.get('/register',authController.showRegisterForm)
router.post('/register',authValidator.register(),authController.register)

router.use('/dashboard',dashboardController.index)



module.exports = router