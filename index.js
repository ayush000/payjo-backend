// Entry point of the project
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const cors = require('kcors')
require('./models/User')
require('./models/Product')
const routes = require('./routes')
const app = new Koa()

mongoose.connect('mongodb://localhost/payjo')
mongoose.Promise = global.Promise
mongoose.set('debug', true)

// Error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // Set body = err.message
    ctx.status = err.status || 500
    ctx.body = err.message
    // Event is emitted to preserve koa behavior
    ctx.app.emit('error', err, ctx)
  }
})

app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(routes)
app.listen(process.env.PORT || 3005)
