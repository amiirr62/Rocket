
const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const editUserValidator = require('../validators/editUserValidator')

const UserProfileImg = require('../upload/UserProfileImg')

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    } 
    res.redirect('/auth/login')
})




router.get ('/', dashboardController.index)

router.post('/edituser', UserProfileImg.single('img') , (req,res,next)=>{
    
    if (!req.file){
        req.body.img = null
    }else{
        req.body.img = req.file.filename
    }
    next()



} , editUserValidator.handle() ,dashboardController.edituser)


module.exports = router