import classes from "./books.module.css"

//A single book's information
export default function BookInfo(props) {
  return (
    <div className={classes["info"] }>
      <div className={classes["row1"] }>
        <p>Author: {props.author} </p>
        <p>Copies: {props.copies}</p>
       </div>
      <div className={classes["row2"] }>
        <p>Genre: {props.genre} </p>
        <p>Location: {props.location} </p>
      </div>
     </div>
  )
}