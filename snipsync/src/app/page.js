"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';

export default function Home() {
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
