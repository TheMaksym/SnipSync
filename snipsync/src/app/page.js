"use client"
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Page1 } from "./Pages/Page1";
import { Page2 } from "./Pages/Page2";
import { Lay } from "./Components/Lay";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Lay/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/page1" element={<Page1/>}/>
          <Route path="/page2" element={<Page2/>}/>
        </Route>
      </Routes>
    </Router>
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
