const mongoose = require('mongoose')
const Product = mongoose.model('Product')
module.exports = {
  async create(ctx) {
    let { product = {} } = ctx.request.body
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
  async update(ctx) {
    let { product = {} } = ctx.request.body
    const { id } = ctx.params
    if (!product.name ||
      !product.code ||
      !product.quantity ||
      !product.expiry || !id) {
      ctx.throw(
        422,
        'Invalid fields'
      )
    }
    ctx.body = await Product.findByIdAndUpdate(id, { $set: product }, { new: true })
  },
  async delete(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.throw(
        422,
        'Invalid fields'
      )
    }
    await Product.findByIdAndRemove(id)
    ctx.body = {}
  },
}
