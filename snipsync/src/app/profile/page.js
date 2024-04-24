'use client'

import Navbar from '../../components/Navbar';
import NavbarProfile from '@/components/NavbarProfile';
import Home from '../page';
import styles from './profile.module.css'
import axios from 'axios';
import Image from 'next/image'





export default function Profile(){
    return(
        <div className={styles.Home}>
            <Navbar/>
            <NavbarProfile/>
            <div className={styles.imageContainer}>
              <Image
                src="/images/SnipSyncLogo.png"
                alt="pfp"
                width={100}
                height={100}
              />
            </div>
                                      
        </div>
            
            
        
        

    
    )
}