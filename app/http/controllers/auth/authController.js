const express = require('express')
const { body, validationResult } = require('express-validator')
const Controller = require('../Controller')

const Recaptcha = require('express-recaptcha').RecaptchaV2

var options = { hl: 'en' }
var recaptcha = new Recaptcha('6LcIXvIkAAAAAA26fU0fC9KSEkwhJjcCk5XhcDcd', 
                              '6LcIXvIkAAAAAP05uPm9nFyJhzHfrOf9n0hl2kcK', options)



class authController extends Controller  {
     
    
    async showRegisterForm(req,res,next){
        try {   
             return res.render('auth/register',{recaptcha : recaptcha.render()})
            } catch (err) {
                next(err)
            }
        }


    async showLoginForm(req,res,next){
        try {
            
            return  res.render('auth/login',{recaptcha : recaptcha.render()})
        } catch (err) {
            next(err)
        }
    }
    

    async  registerProcess(req,res,next){
       try{
//************************** Recaptcha Result Process ************************ */
        let recaptchaResult =  await new Promise((resolve,reject)=>{
            recaptcha.verify(req,(err,data)=>{
                if(err){
                    req.flash('errors','Checkmark Recaptcha plz !!!')
                    res.redirect(req.url)
                    resolve(false)
                }else{
                    resolve(true)
                }

            })
        })

        if(!recaptchaResult){
            return 
        }
//************************** End OF Recaptcha Result Process ************************ */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        let myErrors = (errors.array().map(err => err.msg))

       
        req.flash('errors', myErrors)
        
        return res.redirect('/register')

       }
    }catch (err) {
        next(err)
}


        
    return res.redirect('/login')

    
   
}
}


module.exports = new authController
