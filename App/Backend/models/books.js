const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bookId: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('books', bookSchema,)
