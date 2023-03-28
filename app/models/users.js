
const mongoose = require ('mongoose')


const usersSchema = mongoose.Schema({

    name :   {type : String , require : true},
    admin:   {type : Boolean, default:0},
    email:   {type : String,  unique : true , require:true},
    password:{type : String,  require:true},
    rememberToken:{type : String , default:null}


}, {timestamps:true})



module.exports = mongoose.model('Users' , usersSchema , 'Users')

