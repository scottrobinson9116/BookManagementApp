"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import {getUserBooks, getAllBooks} from '@/lib/axios'
import classes from "./home.module.css"
import Navbar from "./_components/Navbar"
import Books from "./_components/Books"
import AllBooks from './_components/AllBooks'
import Profile from "./_components/Profile"
import { checkOut, checkIn } from '@/lib/axios'


export default function Home() {

  //Initializes Home component state
  const [clickedState, setClickedState] = useState([0, 0, 0])
  const [titleState, setTitleState] = useState("Brandi's Books")
  const [userBooks, setUserBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [bookState, setBookState] = useState([])
  const [reUp, setReUp] = useState(0)
  const session = useSession();

  //Checks out the selected book
  function handleCheckOut(user, bookId) {
    checkOut(user, bookId).then(results => setReUp(prev => {
      const newCount = prev + 1
      return newCount
    }))
  }

  //Checks in the selected book
  function handleCheckIn(username, id) {
    checkIn(username, id).then(results => setReUp(prev => {
      const newCount = prev + 1
      return newCount
    }))
  }

  useEffect(() => {
    //Maps the owned/check out buttons and sets them to state
    function mapButtons(allB, userB) {
        let bookStateArr = []
        allB.map((obj) => {
          let bool = false
          for (let i = 0; i < userB.length; i++) {
            if (obj.id == userB[i].id) {
              bookStateArr = [...bookStateArr, "Owned"]
              bool = true
            } 
          }
          if (bool == false) {
            bookStateArr = [...bookStateArr, "Check Out"]
          }
          }
      )
        setUserBooks(userB)
        setAllBooks(allB)
      setBookState(bookStateArr)
      }

      //Once the browser is authenticated it fetches book data from MongoDB
      if (session.status == "authenticated") {
        getUserBooks(session.data.token.sub).then(bookArr => 
          {getAllBooks().then(books => {return books}
          ).then(results =>
          {
            mapButtons(results, bookArr)
          })
        }
        ).catch(err => console.log(err))
        
      }

    }, [session.status, clickedState, reUp])

  return (
    <>
      <div className={classes['background']}>
        {session.status === "authenticated" &&
        <div>
            <h2 className={classes['opttitle']}>{titleState}</h2>
          <div><Navbar clickedState={clickedState} setClickedState={setClickedState} title={titleState} setTitleState={setTitleState} /></div></div>}
      </div>
      {session.status === "authenticated" && clickedState[0] == 1 && <div className={classes['booklistwrapper']}><Books handleCheckIn={handleCheckIn} clickedState={clickedState} userBooks={userBooks} setUserBooks={setUserBooks} /></div>}
      {session.status === "authenticated" & clickedState[1] == 1 && <div className={classes['searchlistwrapper']}><AllBooks bookState={bookState} handleCheckOut={handleCheckOut} handleCheckIn={handleCheckIn} clickedState={clickedState} userBooks={userBooks} allBooks={allBooks} /></div>}
      {session.status === "authenticated" & clickedState[2] == 1 && <div className={classes['searchlistwrapper']}><Profile /></div>}
      {session.status === "unauthenticated" &&
        <p className={classes["accessdenied"]}>403 Unauthorized</p>}
    </>
  )
}