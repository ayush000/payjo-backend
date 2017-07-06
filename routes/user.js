const Router = require('koa-router')
const router = new Router()
const { user } = require('../controllers')

router.post('/users/login', user.login)
router.post('/users', user.register)

module.exports = router.routes()
