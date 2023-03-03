
class homeController {
    index(req,res){
        res.json('Home Page is here')
    }

    course(req,res){
        res.json('Course Under Home Page')
    }

   
}

module.exports = new homeController()


