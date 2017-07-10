const Router = require('koa-router')
const router = new Router()
const { product } = require('../controllers')

router.post('/products', product.create)
router.get('/products', product.get)
router.put('/products/:id', product.update)
router.del('/products/:id', product.delete)

module.exports = router.routes()
