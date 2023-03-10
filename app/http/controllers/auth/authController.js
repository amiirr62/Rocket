const express = require('express')
const { body, validationResult } = require('express-validator')





class authController  {
     
    
    async showRegisterForm(req,res,next){
        try {   
             return res.render('auth/register')
            } catch (err) {
                next(err)
            }
        }


    async showLoginForm(req,res,next){
        try {
            
            return  res.render('auth/login')
        } catch (err) {
            next(err)
        }
    }
    

    registerProcess(req,res,next){
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        let myErrors = (errors.array())
        req.flash('errors', myErrors)
        
        return res.redirect('/register')
    }

        
    return res.redirect('/login')

    
   
}
}


module.exports = new authController
