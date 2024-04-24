'use client'
import styles from './NavBarProfile.module.css'
import Link from 'next/link';
import React from 'react';

export default function NavbarProfile (props) {
    return (
    
        <nav className={styles.miniNav}>
            
                <div className={styles.navLinks}>
                    <a href="/profile"  className={styles.miniNavButton}>Profile</a>
                    <a href="/test2"  className={styles.miniNavButton}>test2</a>
                    <a href="/test3"  className={styles.miniNavButton}>test3</a>

                </div>
            
            
        </nav>
    );
};