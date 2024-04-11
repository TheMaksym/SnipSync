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
    <main className={styles.main}>
      <div className={styles.description}>
        <Image
          src="/images/Logo.png" 
          alt="Logo"
          width={200} 
          height={200}
        />
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className={styles.buttons}>
            <input type="submit" value="Sign In" />
            <input type="button" value="Create Account" />
          </div>
        </form>
      </div>
    </main>
  );
}
