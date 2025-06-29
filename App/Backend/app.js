const express = require('express')
const mongoose = require('mongoose')

const bookRoutes = require('./routes/books')
const profileRoutes = require('./routes/profiles')

const app = express();

//Allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,PATCH,DELETE")
  res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization")
  next()
})

//Middleware Registering
app.use("/profiles", express.json(), profileRoutes)

app.use("/books", express.json(), bookRoutes)

//Establish connection with MongoDB
mongoose.connect("mongodb+srv://scottrobinson9116:Farlo234*@libredb.jcbgvek.mongodb.net/LibreDB?retryWrites=true&w=majority&appName=LibreDB")
  .then(
    app.listen(2000)
).catch(err => {
  console.log(err)
})