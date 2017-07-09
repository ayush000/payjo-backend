const Router = require('koa-router')
const router = new Router()
const { product } = require('../controllers')

router.post('/products', product.create)
router.get('/products', product.get)

module.exports = router.routes()
