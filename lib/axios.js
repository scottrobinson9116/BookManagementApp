import axios from 'axios';
import http from 'http'
import { signIn } from 'next-auth/react'

//Establishes connection with backend
const axiosInstance = axios.create({
  baseURL: 'http://localhost:2000',
  timeout: 10000,
  httpAgent: new http.Agent({ keepAlive: true }),
  headers: {
    'Content-Type': 'application/json',
  },
});

//Gets all books within MongoDB
export function getAllBooks() {
  const allBooks = axiosInstance.get('/books/allbooks').then(results => { return results.data }).catch(err => console.log(err))
  return allBooks
}
//Implements checkout
export function checkOut(user, bookId) {
  const checkOut = axiosInstance.patch('/profiles/user/out', { username: user, id: bookId }).then(results => {
    return results
  }).catch(err => console.log(err))
  return checkOut
}
//Gets all books owned by the User
export function getUserBooks(user) {
  let userBooks = axiosInstance.post('/profiles/user/userbooks', {username: user})
    .then(results => {
      return results.data
    })
    .catch(error => {
      console.error('Error:', error);
    })
    return userBooks
}

//Handles the login functionality
export function getAuth(user, pass) {

  axiosInstance.post('/profiles/auth/credentials', { username: user, password: pass }).then(
    results => {
      if (results.data == null) { throw new Error("Invalid Credentials") }
      else {
        process.env.USERNAME = user
        process.env.PASSWORD = pass
        signIn('credentials', { redirect: false, username: user, password: pass }).then(results => {
          if (results) {
            window.location.href = 'http://localhost:3000/home'
            console.log(results)
          }
        }       
        ).catch(err => console.log(err))
      }
    }
  )
}
//Checks in the selected book
export function checkIn(user, bookId) {
  const checkIn = axiosInstance.patch('/profiles/user/in', { username: user, id: bookId
  }).then(results => { return results }).catch(err => console.log(err))
  return checkIn
}

//Gets the User profile information
export function getInfo(user) {
  const userInfo = axiosInstance.post('/profiles/user/profile', { username: user }).then(results => {
    return results.data
  }).catch(err => console.log(err))
  return userInfo
}


