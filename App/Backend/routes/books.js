const express = require('express')

const booksController = require('../Controllers/books')

const router = express.Router();

//Routes for all books

router.get('/allbooks', booksController.getBooks)

module.exports = router