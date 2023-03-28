
require('app-module-path').addPath(__dirname + '/app')

const App = require('./app/index')

require('dotenv').config()

global.config = require('./config/index')


new App()





