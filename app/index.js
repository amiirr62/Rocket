const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const flash = require('connect-flash')
const passport = require('passport')
const Helpers = require('./helpers')
const rememberLogin = require('./http/middlewares/rememberLogin')
const { handle } = require('./http/middlewares/rememberLogin')

//const uniqueString  = require('unique-string')


module.exports = class Application {
    constructor(){

        this.setupExpress()  
        this.setConfig()
        this.setMongoose()
        this.setRouters()
    }

        setupExpress() {

            const server = http.createServer(app)

            server.listen(config.port, ()=> console.log(`Server is running on Port ${config.port}`))
        }
        setMongoose(){
            mongoose.Promise = global.Promise
            mongoose.connect(config.database.url).then(() => console.log(`Connected over port ${config.port}`))
            mongoose.set('strictQuery', false)
           
        }
        setConfig(){
            
            
            app.use(express.static(__dirname + config.layout.public_dir))
            app.set('view engine', config.layout.view_engine)
            app.set('views', config.layout.view_dir)

            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({extended : true}))
            
            
            app.use(cookieParser(config.cookie_secretkey))
            app.use(session({...config.session}))
            app.use(flash()) 
            
            require('./passport/passport-local')
            app.use(passport.initialize())
            app.use(passport.session())

            app.use(rememberLogin.handle)

            app.use((req,res,next)=>{       ///We access to req in all views
                res.locals = {errors : req.flash('errors'), req }
                app.locals = new Helpers(req,res).getObjects()
                next()
              })
            
            

    }
        setRouters(){
            app.use(require('./routes/web/index'))
            app.use(require('./routes/api/index'))
        }
}