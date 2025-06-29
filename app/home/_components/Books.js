"use client"
import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import classes from "./books.module.css"
import Book from "./Book"


//Displays user's books
export default function Books(props) {
  const session = useSession()

  return (
    <div className={classes['books2']}>
      {props.userBooks.map((obj, index) => (typeof obj == "object" &&
            <Book clickedState={props.clickedState} className={index === 0 ? 'topbook' : ""} key={index} title={obj.title} author={obj.author} copies={obj.copies} genre={obj.genre} location={obj.location} id={obj.id} handleCheckIn={props.handleCheckIn} index={index} {...Book} />
        ))}
   </div>
  )
}