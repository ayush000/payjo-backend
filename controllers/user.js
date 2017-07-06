var mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model('User')

module.exports = {
  async login (ctx) {
    ctx.body = ctx.request.body
  },
  async register (ctx) {
    const { body } = ctx.request
    let { user = {} } = body
    const u = new User()
    u.email = user.email
    u.password = await bcrypt.hash(user.password, 10)
    await u.save()
    ctx.body = {
      email: u.email,
      token: u.generateJWT(),
    }
  },
}
