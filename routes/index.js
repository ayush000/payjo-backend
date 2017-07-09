const Router = require('koa-router')

const router = new Router()
const api = new Router()

const user = require('./user.js')
const product = require('./product.js')

api.use(user)
api.use(product)

router.use('/api', api.routes())
module.exports = router.routes()
