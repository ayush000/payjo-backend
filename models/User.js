const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// const validate = require('mongoose-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const validateEmail = (email) => /\S+@\S+/.test(email)

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    validate: [validateEmail, 'Please fill a valid email address'],
    index: true,
  },
  password: String,
}, { timestamps: true })

userSchema.plugin(uniqueValidator, { message: 'is already taken' })

userSchema.methods.generateJWT = () => jwt.sign({
  id: this._id,
  email: this.email,
}, secret, { expiresIn: '7d' })

mongoose.model('User', userSchema)
