const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'can\'t be blank'],
    trim: true,
  },
  code: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    uppercase: true,
    index: true,
    trim: true,
  },
  quantity: Number,
  expiry: Date,
}, { timestamps: true })

productSchema.plugin(uniqueValidator, { message: 'is already taken' })
mongoose.model('Product', productSchema)
