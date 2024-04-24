'use client'

import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar (props) {
  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(props.isUserAuthenticated);
  return (
    <nav className={styles.nav}>
        <Link href="/">
          <Image 
            src="/images/SnipSyncLogo.png"
            width={50}
            height={50}
            alt="Logo"
            />
        </Link> 
        {isUserAuthenticated && 
          <div className={styles.navLinks}>
              <a href="/dashboard" style={{ textDecoration: "none" }} className={styles.btn_primary}>Dashboard</a>
              <a href="/profile" style={{ textDecoration: "none" }} className={styles.btn_primary}>My Profile</a>
          </div>
        }
        {!isUserAuthenticated && 
          <div className={styles.navLinks}>
              <a href="/login" className={styles.btn_primary}>Log In</a>
              <a href="/signup" className={styles.btn_secondary}>Sign Up</a>
          </div>
        }
    </nav>
  );
};