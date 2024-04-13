'use client';

import React, { useState } from 'react';
import '../globals.css'
import Navbar from '../../components/Navbar';
import styles from './Login.module.css';
import Link from 'next/link';

export default function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated] = useState(localStorage.getItem("authenticated") === 'true');


    return (
        <>
            <Navbar isUserAuthenticated={authenticated} activeLink="" />
            <div className={styles.Home}>
                <div className={styles.FormContainer}>
                    <div className={styles.Content}>
                        <h3 className={styles.h3}>SnipSync - Log In</h3>
                        <div>
                            <label className={styles.label} htmlFor="email">Username</label>
                            <input className={styles.input} type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input className={styles.input} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        </div>
                        <button className={styles.submit} type="button" onClick={() => SignIn(username, password)}>Submit</button>
                        
                    </div>
                </div>
            </div>
        </>
    );

    async function SignIn(username, password) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        }
        const response = await fetch('http://localhost:5050/User/validate/', requestOptions)

        if (response.status == 403) {
            console.log(response.statusText)
            console.log("DENIED")
            localStorage.setItem("authenticated", false)
        }
        else if (response.status == 200) {
            console.log("Success!")
            localStorage.setItem("authenticated", true)
        }
        else {
            console.log(response.statusText)
        }
    }


}