const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const logger = require('koa-logger')
require('./models/User')
const routes = require('./routes')
const app = new Koa()

mongoose.connect('mongodb://localhost/payjo')
mongoose.Promise = global.Promise
mongoose.set('debug', true)

app
  .use(logger())
  .use(bodyParser())
  .use(routes)
app.listen(process.env.PORT || 3005)
