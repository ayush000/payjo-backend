const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model('User')

module.exports = {
  // Login existing user
  async login(ctx) {
    const { body } = ctx.request
    if (!body.user.email || !body.user.password) {
      ctx.throw(
        422,
        'Email or password empty'
      )
    }
    const user = await User.findOne({ email: body.user.email })
    if (!user) {
      ctx.throw(
        401,
        'Invalid user or password'
      )
    }
    // Compare password with hash
    const passwordValid = await bcrypt.compare(body.user.password, user.password)
    if (!passwordValid) {
      ctx.throw(
        401,
        'Invalid user or password'
      )
    }
    ctx.body = {
      email: user.email,
      token: user.generateJWT(),
    }
  },
  // Register a new user
  async register(ctx) {
    const { body } = ctx.request
    let { user = {} } = body
    if (!body.user.email || !body.user.password) {
      ctx.throw(
        422,
        'Invalid email or password'
      )
    }
    const u = new User()
    u.email = user.email
    // Create hash from password and store in database
    u.password = await bcrypt.hash(user.password, 10)
    await u.save()
    ctx.body = {
      email: u.email,
      token: u.generateJWT(),
    }
  },
}
