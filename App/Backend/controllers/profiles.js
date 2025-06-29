const Profile = require('../models/profiles')
const body = require('body-parser')
const Books = require('../models/books')

//Get profile info
exports.getInfo = (req, res, next) => {
  const uname = req.body.username
  Profile.find({ username: uname }).then(profile => res.send(profile)).catch(err => { console.log(err) })
}

//Get all books that are checked out
module.exports.getCheckedOutBooks = (req, res, next) => {
  const usernameReq = req.body.username
  Profile.find({ username: usernameReq }).then(results => {
    bookIdArr = results[0].bookIds
    return bookIdArr
  }).then((bookIdArr) => {
    Books.find({
      id: { $in: [bookIdArr[0], bookIdArr[1], bookIdArr[2], bookIdArr[3]] }
    }).then((final) => {
      for (let i = 0; i < 4; i++) {
        if (typeof final[i] != 'number')
        final = [...final, -1]
      }
      res.send(final)
    }).catch(err => console.log(err))
  }
  ).catch((err) => { console.log(err) })
}

//Compares credentials for login
module.exports.getCredentials = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  Profile.find({ $and: [{ username: username }, { password: password }] }).then(results => {
    console.log(results)
    if (results.length === 0) {
      res.status(401).send(results)
    } else {
      res.status(201).send(results)
    }
  }).catch(err => console.log(err))
}

//Handles checking in a book
module.exports.checkInBooks = (req, res, next) => {
  const user = req.body.username;
  const bookId = req.body.id
  Profile.find({ username: user }).then(
    profile => {
      return profile[0].bookIds
    }
  ).then(idArr => {
    for (let i = 0; i < 5; i++) {
      if (idArr[i] == bookId) {
        idArr.splice(i, 1, -1)
      }
    }
    return idArr;
  }
  ).then(arr =>
    Profile.updateOne({ username: user }, { $set: { bookIds: arr } })).then(
      Books.find({ id: bookId }).then(results => { return results[0].copies }).then(prevCopies => {
        let newCopies = prevCopies + 1
        Books.updateOne({ id: bookId }, {
          $set: {copies: newCopies}
        }).then(results => res.status(201).send(results)).catch(err => console.log(err))}).catch(err => console.log(err))
  ).catch(err => console.log(err))

}

//Handles checking out a book
module.exports.checkOutBooks = (req, res, next) => {
  const user = req.body.username
  const id = req.body.id

  Books.findOne({
    $and: [
      { id: id }, { copies: { $gt: 0 } }]
  }).then(results => {
    if (results === null) {
      throw new Error('No Book Available')
    } else {
      newCopies = results.copies - 1
      return newCopies
    }
  }).then(newCopies => {
    Books.updateOne({ id: id }, { $set: { copies: newCopies } }).then().catch(err => console.log(err))
  }).then(
    Profile.findOne({ username: user }).then(results => {
      return results.bookIds
    }).then(idArr => {
      for (let i = 0; i < 5; i++) {
        if (idArr[i] == -1) {
          idArr[i] = id
          Profile.updateOne({ username: user }, { $set: { bookIds: idArr } }).catch(err => console.log(err))
          break
        } else if (i == 4) {
          console.log("Limit Reached")
        }
      }
    }).then(Books.find().then(results => res.status(201).send(results))).catch(err => console.log(err)))
.catch(err => console.log(err))
  }
