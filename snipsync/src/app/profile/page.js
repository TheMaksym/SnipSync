"use client";

import styles from "./profile.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function profile() {

    const router = useRouter();

    function logout(){
        localStorage.setItem("authenticated", "false");
        localStorage.setItem("username", "");
        localStorage.setItem("access_token", "");
        localStorage.setItem("access_token_twitch", "");
        router.push("/")
    }



  return (
    <>
      <div className={styles.main}>
        <p>WIP Profile Page</p>
        <button className={styles.login} onClick={() => logout()}>Logout</button>
        <a className={styles.login} href="http://localhost:5050/youtube/user/signin">Link Youtube</a>
        
        <a className={styles.login} href="http://localhost:5050/twitch/user/signin">Link Twitch</a>
      </div>
    </>
  );
}
