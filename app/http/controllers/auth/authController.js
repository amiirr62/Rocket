





class authController  {
    showLoginForm(req,res){
        res.render('auth/login')
    }

    showRegisterForm(req,res){
        res.render('auth/register')
    }

    
   
}



module.exports = new authController()
