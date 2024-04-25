"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';  // Ensure Link is imported from 'next/link'

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated") === "true";
    if (authenticated) {
      push("/dashboard");
    }
  });

  return (
    <>
      <Navbar isUserAuthenticated={false} activeLink="home" />

      <div className={styles.main}>
        <div className={styles.container}>
          <Image
            src="/images/SnipSyncLogo.png"
            alt="Logo"
            width={200}
            height={200}
          />

          <div className={styles.buttonBox}>
          <Link href="/login" legacyBehavior>
            <a className={styles.login}>Log In</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className={styles.signup}>Sign Up</a>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}