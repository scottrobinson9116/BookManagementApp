'use client'

import classes from "../login.module.css"
import { getAuth } from "@/lib/axios"
import axios from 'axios'
import http from 'http'

export default function LoginWindow() {

  //Login submit button handler
  function handleSubmit(e) {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    getAuth(username, password)

  }



  return (
    <div className={classes["loginwindow"]}>
    <div className={classes["loginbackground"]}></div>
      <h2>Brandi's Books LLC</h2>
      <form onSubmit={handleSubmit} method="POST" id={classes["login"] } >
         <input label='username' type="text" placeholder="  Username" />
         <input label='password' type="password" placeholder="  Password" />
          <button type="submit" >Sign In</button>
      </form>
    </div >
  )
}