'use client'

import Navbar from '../../components/Navbar';
import NavbarProfile from '@/components/NavbarProfile';
import styles from './profile.module.css'
import Image from 'next/image'

import React, { useEffect, useState} from 'react'


//<Navbar/>
            //<NavbarProfile/>
            //<div className={styles.imageContainer}>
              //<Image
                //src="/images/SnipSyncLogo.png"
                //alt="pfp"
                //width={100}
                //height={100}
              ///>
            //</div>


export default function Profile(){
    const [username, setuserName] = useState('');

    useEffect(() => {
      const storedName = localStorage.getItem("username");
      if(storedName) {
        setuserName(storedName);
      }
    }, []);
  



    return(
        <div className={styles.Home}>
            <h1>Stored Name: {username}</h1>
            
                                      
        </div>
            
            
        
        

    
    )
}