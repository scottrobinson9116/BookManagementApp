"use client"

import {useSession} from 'next-auth/react'
import { useState, useEffect } from 'react'
import classes from "./books.module.css"
import BookInfo from "./BookInfo"
import { checkIn } from '@/lib/axios'

//Displays each book's information
export default function Book(props) {
  const [clicked, setClicked] = useState(false)

  const session = useSession();

  function handleClick() {
    setClicked(true)
  }

  function handleClose() {
    setClicked(false)
  }

  return (
    <>
      <div className={clicked ? classes["dropdown"] : classes['book']} >
        <div className={classes["infowrapper"]}>
          <h2 onClick={() => handleClick()}>{props.title}</h2>
          {clicked &&
            <div>
              <BookInfo allBooks={props.allBooks} key={props.id} author={props.author} copies={props.copies} genre={props.genre} location={props.location} />
              <p onClick={() => handleClose()
              } className={classes["x"]}>X</p>
              {props.clickedState[0] == 1 && <button className={classes['checkin'] } onClick={() => props.handleCheckIn(session.data.token.sub, props.id)}>Check In</button>}
              {(props.clickedState[1] == 1) && (props.bookState[props.index] == "Check Out" ) ? < button className={classes["checkout"]} onClick={() => props.handleCheckOut(session.data.token.sub, props.id)}>Check Out</button> : props.clickedState[1] == 1 && <button className={ classes["owned"]}>Owned</button>} 
            </div>}
        </div>
      </div>
    </>
  )
}