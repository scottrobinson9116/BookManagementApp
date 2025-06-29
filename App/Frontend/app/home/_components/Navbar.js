"use client"
import Image from "next/image"
import classes from "@/app/home/home.module.css"
import logo from '@/assets/logoV3.png'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

//Navbar component that allows navigation within the app
export default function Navbar(props) {
  const session = useSession()

  function handleClick(input) {
    let newArr = []
    if (input == 0) {
      newArr = [1, 0, 0]
      props.setClickedState(newArr)
      props.setTitleState("Brandi's Books - My Books")

    } else if (input == 1) {
      newArr = [0, 1, 0]
      props.setClickedState(newArr)
      props.setTitleState("Brandi's Books - Search")
    } else if (input == 2) {
      newArr = [0, 0, 1]
      props.setClickedState(newArr)
      props.setTitleState("Brandi's Books - Profile")
    }

    
  }

  function handleLogout() {
    signOut({callbackUrl: '/signIn'})
  }

  return (
  <div className={classes["navbar"]}>
      <div className={classes["navbackground"]}></div>
      <div className={classes["titlelogo"] }>
        <h1 className={classes["title"]}>LibreBooks</h1>
        <Image className={classes["logo"]} src={logo} alt="LibreBooks Logo" priority/>
      </div>
    <div className={classes["navlist"]}>
        <button onClick={() => handleClick(0) } id={props.clickedState[0] ? classes["topclicked"] : classes["mybooks"]}>My Books</button>
        <button onClick={() => handleClick(1)} id={props.clickedState[1] ? classes["clicked"] : classes["search"]}>Search</button>
        <button onClick={() => handleClick(2)} id={props.clickedState[2] ? classes["clicked"] : classes["profile"]}>Profile</button>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
  </div>
  )
}