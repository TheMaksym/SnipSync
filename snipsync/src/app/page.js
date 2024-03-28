"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';

export default function Home() {
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Image
          src="/images/Logo.png" 
          alt="Logo"
          width={100} 
          height={100}
        />
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <div className={styles.buttons}>
            <input type="button" value="Sign In"  onClick={() => SignIn(username,password)}/>
            <input type="button" value="Create Account" onClick={() => CreateAccount(username, password)} />
          </div>
        </form>
      </div>
    </main>
  );
}

async function CreateAccount(username, password){
  const requestOptions ={
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  }
  
  const response = await fetch('http://localhost:5050/User/Create', requestOptions)
  
  if(response.status==403){
    console.log("Username already detected");
  }
  else if(response.status==200){
    console.log("Success!");
  }
  else{
    console.log(response.statusText)
  }

}

async function SignIn(username, password){
  const requestOptions ={
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  }
  const response = await fetch('http://localhost:5050/User/validate/', requestOptions)
  
  if(response.status==403){
    console.log("DENIED");
  }
  else if(response.status==200){
    console.log("Success!");
  }
  else{
    console.log(response.statusText)
  }
}
