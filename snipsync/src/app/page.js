import Image from "next/image";
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Page1 } from "./Pages/Page1";
import { Page2 } from "./Pages/Page2";
import { Lay } from "./Lay";

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
    )
}


=======
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>

      <Navbar isUserAuthenticated={false} activeLink="" />

      <div className={styles.main}>

        <Image
          src="/images/SnipSyncLogo.png"
          alt="Logo"
          width={200}
          height={200}
        />

        <div className={styles.buttonBox}>

          <a href="/login" className={styles.login}>Log In</a>
          <a href="/signup" className={styles.signup}>Sign Up</a>
        </div>

      </div>

    </>
  );
}
>>>>>>> 12778351627ac9fde206548f74332c0634a6dfdd
