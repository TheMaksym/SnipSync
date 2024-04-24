"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../globals.css";
import Navbar from "../../components/Navbar";
import styles from "./Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated") === "true";
    if (authenticated) {
      router.push("/dashboard");
    }
  }, [router]);

  const SignIn = async (username, password) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:5050/User/validate/",
        requestOptions
      );
      if (response.status === 403) {
        setError("Login credentials don't add up.");
      } else if (response.status === 200) {
        localStorage.setItem("authenticated", true);
        router.push('/dashboard');
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <>
      <Navbar isUserAuthenticated={false} activeLink="login" />
      <div className={styles.Home}>
        <div className={styles.FormContainer}>
          <div className={styles.Content}>
            <Image
              src="/images/SnipSyncLogo.png"
              alt="Logo"
              width={300}
              height={300}
            />
            <h3 className={styles.h3}>SnipSync - Log In</h3>
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className={styles.error}>{error}</p>} 
              <button
                className={styles.submit}
                type="button"
                onClick={() => SignIn(username, password)}
              >
                Submit
              </button>
            </form>
            <Link href="/signup" className={styles.link}>
              Don't have an account? Sign up here.
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  async function SignIn(username, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const response = await fetch(
      "http://localhost:5050/User/validate/",
      requestOptions
    );

    if (response.status == 403) {
      console.log(response.statusText);
      console.log("DENIED");
      localStorage.setItem("authenticated", false);
    } else if (response.status == 200) {
      console.log("Success!");
      localStorage.setItem("authenticated", true);
      push('/dashboard');
    } else {
      console.log(response.statusText);
    }
  }
}
