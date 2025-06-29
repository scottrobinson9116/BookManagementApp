const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  username: {
    type: String,
    required: true
},
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bookIds: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model('profiles', profileSchema)