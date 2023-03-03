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


module.exports = class Application {
    constructor(){

        this.setupExpress()  
        this.setConfig()
        this.setMongoose()
        this.setRouters()
    }

        setupExpress() {

            const server = http.createServer(app)

            server.listen(4000, ()=> console.log('Server is running on Port 4000'))
        }
        setMongoose(){
            mongoose.Promise = global.Promise
            mongoose.connect('mongodb://127.0.0.1:27017/NJS-Khodam').then(() => console.log('Connected!'))
            mongoose.set('strictQuery', false)
        }
        setConfig(){
            

            app.use(express.static(__dirname + '/public'))
            app.set('view engine', 'ejs')
            app.set('views', path.resolve('./resource/views'))

            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({extended : true}))
            
            app.use(cookieParser('hbdakq2eq2q5546535qopkosqnwx9849'))
            app.use(session({
                secret: 'mysecrettkkey',
                resave: true,
                saveUninitialized: true,
                cookie : {expires : new Date(Date.now() + (1000 * 3600 * 24 * 100)) ,
                          store   : MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/Rocket' })
                        }
              }))
            app.use(flash()) 

            

    }

        setRouters(){
            app.use(require('./routes/web/index'))
            app.use(require('./routes/api/index'))
        }
}