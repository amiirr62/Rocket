const User = require('../../../models/users')

const passport = require('passport')


const { body, validationResult } = require('express-validator')





module.exports = new class dashboardController  {
    //**************************************** index ********************************/
    async index(req,res,next){

       try {
        return res.render('dashboard')
        
       } catch (err) {
            next(err)
       }
    }
   
        catch (err) {
              next(err)
        }
//*********************************** edituser *************************************/
    

    
  }
  