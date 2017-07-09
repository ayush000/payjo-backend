const mongoose = require('mongoose')
const Product = mongoose.model('Product')
module.exports = {
  async create(ctx) {
    const { body } = ctx.request
    let { product = {} } = body
    console.log(product)
    if (!product.name ||
      !product.code ||
      !product.quantity ||
      !product.expiry) {
      ctx.throw(
        422,
        'Invalid fields'
      )
    }

    const p = new Product(product)
    await p.save()
    ctx.body = p
  },
  async get(ctx) {
    ctx.body = await Product.find({})
  },
}
