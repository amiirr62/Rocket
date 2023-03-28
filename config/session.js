const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')


module.exports = {
    secret: process.env.SESSION_SECRETKEY,
    resave: true,
    saveUninitialized: true,
    cookie : {expires : new Date(Date.now() + (1000 * 3600 * 24 * 20))} ,
    store  : MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/Rocket' })
}


