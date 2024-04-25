'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Navbar(props) {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(props.isUserAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);  // State to manage dropdown visibility
  const dropdownRef = useRef(null);  // Ref for the dropdown container

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setDropdownOpen(false);
          }
      };

      // Add event listener when the dropdown is open and remove when it's closed
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [dropdownOpen]);  // Ensures the effect runs only when dropdownOpen changes
  function logout() {
    localStorage.setItem("authenticated", "false");
    localStorage.setItem("username", "");
    localStorage.setItem("access_token", "");
    localStorage.setItem("access_token_twitch", "");
    router.push("/");
  }
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
          {isUserAuthenticated && (
              <div className={styles.navLinks}>
                  <a href="/dashboard" className={styles.btn_primary}>Dashboard</a>
                  <a href="/posts" className={styles.btn_primary}>Posts</a>
                  <div className={styles.profileDropdown} ref={dropdownRef}>
                      <button onClick={toggleDropdown} className={styles.btn_primary}>My Profile</button>
                      {dropdownOpen && (
                          <div className={styles.dropdownContent}>
                              <div className={styles.dropdownContent}>
                                <Link href="/profile">Profile</Link>
                                <button onClick={logout} className={styles.btn_primary_no_border}>
                                  Logout
                                </button>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          )}
      </nav>
  );
}
