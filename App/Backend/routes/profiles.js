const express = require('express')
const path = require('path')

const profilesController = require('../Controllers/profiles')

const router = express.Router()

//Routes for user actions

router.post('/user/profile', profilesController.getInfo)

router.patch("/user/in", profilesController.checkInBooks)

router.patch("/user/out", profilesController.checkOutBooks)

router.post('/user/userbooks', profilesController.getCheckedOutBooks)

router.post('/auth/credentials', profilesController.getCredentials)

module.exports = router;