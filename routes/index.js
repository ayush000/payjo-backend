const Router = require('koa-router')
const auth = require('../utils/auth-middleware')

const router = new Router()
const api = new Router()

const user = require('./user.js')
const product = require('./product.js')

api.use(user)
api.use(auth, product)

router.use('/api', api.routes())
module.exports = router.routes()
