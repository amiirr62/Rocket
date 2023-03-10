
const { body } = require('express-validator')


class authValidator {
    register(){
        return [body('name','Name is required!!').not().isEmpty(),
                body('name','Minimum Name length is 3').isLength({ min:3 }),
                body('email','Not a Valid Email!!!!!!').isEmail(),
                body('password','password is required!!').not().isEmpty(),
                body('password','Minimum Password Lenght is 3 Characters!!').isLength({ min:3 })]
    }

    login(){
        return [body('email','Not a Valid Email!!').isEmail(),
                body('password','Minimum Password length is 3 character!!').isLength({ min: 3 })]
    }


}

module.exports = new authValidator
