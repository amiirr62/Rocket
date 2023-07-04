const validator = require('./validator')
const { body, validationResult } = require('express-validator')


class authRequest extends validator{
    register(){
        return [
        body('name', 'Enter Full name').not().isEmpty(),
        body('email', 'Invalid Email!!!').isEmail(),
        body('password','Minimum Length is 3 characters!').isLength({ min: 3 })
        ]
    }

    login(){
        return [
        body('email', 'Invalid Email!!!').isEmail(),
        body('password','Minimum Length is 3 characters!').isLength({ min: 3 })
        ]
    }
} 

module.exports =  new authRequest
