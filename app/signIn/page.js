
import classes from "./login.module.css"
import LoginWindow from "./_components/LoginWindow"
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers'


export default function Login() {

  //Renders the Login box
  return (
    <div className={classes["login"]}>
      <div className={classes["background"] }></div>
      <LoginWindow />
    </div>
  )}