"use client"
import { useEffect, useState, useCallback} from 'react'
import { useSession } from 'next-auth/react'
import classes from "./books.module.css"
import Book from "./Book"


//Renders every book by fetching data from MongoDB
export default function Books(props) {
  const session = useSession()

  return (
    <div className={classes['books']}>
      {props.allBooks.map((obj, index) => (
        <Book clickedState={props.clickedState} className={index === 0 ? 'topbook' : ""} key={obj.id} title={obj.title} author={obj.author} copies={obj.copies} genre={obj.genre} location={obj.location} id={obj.id} handleCheckIn={props.handleCheckIn} handleCheckOut={props.handleCheckOut} bookState={props.bookState} index={index} allBooks={props.allBooks}
         {...Book} />
      ))}
    </div>
  )
}