const express = require('express')
const { body, validationResult } = require('express-validator')
const Controller = require('../Controller')
const User = require('../../../models/users')
const passport = require('passport')
const Recaptcha = require('express-recaptcha').RecaptchaV2

//var options = { hl: 'en' }
var recaptcha = new Recaptcha(config.service.recaptcha.site_key, 
                              config.service.recaptcha.secret_key, {...config.service.recaptcha.options})



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
    
    async register(req,res,next){ 
        try {
            let recaptchaResult = await new Promise((resolve,reject)=>{
                recaptcha.verify(req,(err,data)=>{
                    if(err){
                        req.flash('errors','Recaptcha needs to be marked!  ')
                        res.redirect('/register')
                        resolve(false)
                    }else{
                        resolve(true)
                    }
                })
            })
            
            if(!recaptchaResult){
                return
            }
                
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    let myErrors = errors.array()
                    req.flash('errors', myErrors)
                    return res.redirect('/register' )
                }
            
        passport.authenticate('local.register',{
            successRedirect : '/login',
            failureRedirect : '/register',
            failureFlash : true

          })(req,res,next)
              
        
        } catch (err) {
            next(err)
        }
    }

    async login(req,res,next){
        try {
            let recaptchaResult = await new Promise((resolve,reject)=>{
                recaptcha.verify(req,(err,data)=>{
                    if(err){
                        req.flash('errors','Recaptcha needs to be marked!  ')
                        res.redirect('/login')
                        resolve(false)
                    }else{
                        resolve(true)
                    }
                })
            })
            
            if(!recaptchaResult){
                return
            }

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let myErrors = errors.array()
                req.flash('errors', myErrors)
                return res.redirect('/login' )
            }
            
            passport.authenticate('local.login', (err,user)=>{
                if(!user) return res.redirect('/login')

            req.logIn(user, err=>{
                if(req.body.remember){
                    user.setRememberToken(res)
                }
            return res.redirect('/dashboard')
            })
        })(req,res,next)
            
        
        } catch (err) {
            next(err)
        }
    }
   
}

module.exports = new authController