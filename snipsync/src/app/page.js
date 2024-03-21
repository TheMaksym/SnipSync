"use client"

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p1>Hello World</p1>
        
        <form>
          <label>
            <div>
              Username:
              <input type="text" name="username" />
            </div>
            <div>
              Password:
              <input type="text" name="password" />
            </div>
            <div>
            Account Name:
            <input type="text" name="accountName" />
            </div>
          </label>
          <div>
          <input type="button" value="Create Account" />
          </div>
          <div>
          <input type="button" value="Sign in" onClick={() => App()} />
          </div>
        </form>
        
        <p1>The value is {App()} </p1>
        
      </div>
    </main>
  );
}

function App(){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5050/user/')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );

}
