const Books = require('../models/books')
const Profile = require('../models/profiles')
const body = require('body-parser')

//Gets every book in the database
module.exports.getBooks = (req, res, next) => {
  Books.find().then(results => {
    res.send(results)
  }).catch(err => {console.log(err) })
}