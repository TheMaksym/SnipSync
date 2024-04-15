// Navbar.js

'use client'
import React, { useState } from 'react';
import styles from './NavbarVert.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar(props) {
  const [isUserAuthenticated] = useState(props.isUserAuthenticated);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <nav 
      className={`${styles.nav} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className={styles.nav}>
        <Link href="/">
          <Image 
            src="/images/SnipSyncLogo.png"
            width={50}
            height={50}
            alt="Logo"
            layout = 'responsive'
            />
        </Link> 
        {isUserAuthenticated && 
          <div className={styles.navLinks}>
              <a href="/dashboard" style={{ textDecoration: props.activeLink === "dashboard" ? "underline" : "none" }} className={styles.link}>Dashboard</a>
              <a href="/profile" style={{ textDecoration: props.activeLink === "profile" ? "underline" : "none" }} className={styles.btn_primary}>My Profile</a>
              
          </div>
        }
        {!isUserAuthenticated && 
          <div className={styles.navLinks}>
              <a href="/login" className={styles.btn_primary}>Log In</a>
              <a href="/signup" className={styles.btn_secondary}>Sign Up</a>
          </div>
        }
    </nav>
    </nav>
  );
}