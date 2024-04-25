'use client'

import Navbar from '../../components/Navbar';
import NavbarProfile from '@/components/NavbarProfile';
import styles from './profile.module.css'
import Image from 'next/image'

import React, { useEffect, useState} from 'react'





export default function Profile(){
    const [username, setuserName] = useState('');

    useEffect(() => {
      const storedName = localStorage.getItem("username");
      setuserName(storedName);
      
    }, []);

    return(
      <div className={styles.Home}>
        <><Navbar isUserAuthenticated={true} activeLink="dashboard"/><NavbarProfile /></>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/SnipSyncLogo.png"
            alt="pfp"
            width={100}
            height={100}
            />
            <p className={styles.imageText}>{username}</p>
        </div>

      </div>
      
      
      
            
       
            
        
        

    
    );
}