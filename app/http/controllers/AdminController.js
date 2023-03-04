const Controller = require('./Controller')

class adminController extends Controller {
    index(req,res){
        res.json('Admin is here')
    }
    course(req,res){
        res.json('Course Under Admin route')
    }
   
    }

module.exports = new adminController()