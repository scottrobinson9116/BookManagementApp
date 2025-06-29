"use client"

import { getInfo } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import classes from "./books.module.css"

//Handles the display of user's profile information
export default function Profile() {
  const session = useSession()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    //Gets profile information from MongoDB
    getInfo(session.data.token.sub).then(info => setUserInfo(info)).catch()
  }, [session.data.token.sub])
  return (
    <>
    <div className={classes['profilewrapper'] }>
      <div className={classes['fields']}>
        <h2>First Name: </h2>
        <h2>Last Name: </h2>
        <h2>Email: </h2>
        <h2>Type: </h2>
      </div>
      {userInfo != null &&
        <div className={classes['userinfo']}>
          <p>{userInfo[0].firstName}</p>
          <p>{userInfo[0].lastName}</p>
          <p>{userInfo[0].email}</p>
          <p>{userInfo[0].type}</p>
        </div>}
    </div>
      <button className={classes['edit'] }>Edit Information</button>
    </>
  )
}