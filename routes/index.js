const Router = require('koa-router')

const router = new Router()
const api = new Router()

const user = require('./user.js')

api.use(user)

router.use('/api', api.routes())
module.exports = router.routes()
