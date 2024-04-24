"use client";

import styles from "./profile.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function profile() {
  const router = useRouter();
  const [twitchToken, setTwitchToken] = useState("");
  const [youtubeToken, setYotubeToken] = useState("");

  useEffect(() => {
    setTwitchToken(localStorage.getItem("access_token_twitch"));
    setYotubeToken(localStorage.getItem("access_token"));
  }, []);

  function logout() {
    localStorage.setItem("authenticated", "false");
    localStorage.setItem("username", "");
    localStorage.setItem("access_token", "");
    localStorage.setItem("access_token_twitch", "");
    router.push("/");
  }

  function UnlinkTwitch(){
    localStorage.setItem("access_token_twitch", "");
    router.push("/dashboard");
  }

  function UnlinkYoutube(){
    localStorage.setItem("access_token", "");
    router.push("/dashboard");
  }

  return (
    <>
      <div className={styles.main}>
        <p>WIP Profile Page</p>
        <button className={styles.login} onClick={() => logout()}>
          Logout
        </button>
        {twitchToken === "" ? (
          <a
            className={styles.login}
            href="http://localhost:5050/twitch/user/signin"
          >
            Link Twitch
          </a>
        ) : (
          <button className={styles.login} onClick={() => UnlinkTwitch()}>
          Unlink Twitch
        </button>
        )}

        {youtubeToken === "" ? (
        <a
          className={styles.login}
          href="http://localhost:5050/youtube/user/signin"
        >
          Link Youtube
        </a>
        ) : (
          <button className={styles.login} onClick={() => UnlinkYoutube()}>
          Unlink Youtube
        </button>
        )}
      </div>
    </>
  );
}