
const express = require('express')
const router = express.Router()
const homeController = require('../../../app/http/controllers/HomeController')
const authController = require ('../../http/controllers/auth/authController')


router.get('/', homeController.index)
router.get('/course',homeController.course)
router.get('/login',authController.showLoginForm)
router.get('/register',authController.showRegisterForm)



module.exports = router