'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Navbar from '../../components/Navbar';
import styles from './Signup.module.css'; // Ensure the CSS module is correctly named and imported
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import axios from 'axios';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated") === "true";
        if (authenticated) {
          router.push("/dashboard");
        }
      });

    const handleSubmit = () => {
        
        if(password === confirmPassword && password.length >= 8) {
            setPasswordError(false);

            const body = {
                email : email,
                username : username,
                password : password
            }
            
            axios.post("http://localhost:5050/user/create/", body);

            localStorage.setItem("authenticated", "true");
            localStorage.setItem("username", username);
            localStorage.setItem("access_token", "");
            localStorage.setItem("access_token_twitch", "");
            router.push('/dashboard')
        } else {
            setPasswordError(true);
        }
    }

    return (
        <>
            <Navbar isUserAuthenticated={false} activeLink="signup" />
            <div className={styles.Home}>
                <div className={styles.FormContainer}>
                    <div className={styles.Content}>
                        <Image
                            src="/images/SnipSyncLogo.png"
                            alt="Logo"
                            width={300}
                            height={300}
                        />
                        <h3 className={styles.h3}>SnipSync - Sign Up</h3>
                        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit();}}>
                            <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className={styles.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input className={styles.input} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            {passwordError &&
                             (<p className={styles.error}>Password must be at least 8 characters long and match the confirm password.</p>)}
                            <button className={styles.submit} type="submit">Sign Up</button>
                            
                        </form>
                        
                        <Link href="/login" className={styles.link}>
                            Have an account? Log In
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
