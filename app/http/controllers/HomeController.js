



class homeController  {
    index(req,res){
        res.render('homePage')
    }

    course(req,res){
        res.json('Course Under Home Page')
    }

    message(){
        return ('exm for Auto-bind inheritence')
    }
   
}

//export default new homeController()

module.exports = new homeController()
