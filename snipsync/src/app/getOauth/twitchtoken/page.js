'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function GetYoutubeToken() {
    const router = useRouter();

    useEffect(() => {
        const hash = window.location.hash.substring(1); //Remove the hash
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        console.log(hash);
        console.log(accessToken);
        //Not needed, but here are the other parts if you want them later
        // const expiresIn = params.get('expires_in');
        // const tokenType = params.get('token_type');
        // const scope = params.get('scope');

        if (accessToken) {

            //Store the access token locally
            localStorage.setItem('access_token_twitch', accessToken);

            const body = {
                twitch_token : accessToken
            }

            axios.patch("http://localhost:5050/user/single/twitch/"+localStorage.getItem('username'), body);

            console.log('Access token retreived: ' + accessToken);
            
            //Redirect to the profile page instead when thats made, for now it redirects to the dashboard
            router.push('/dashboard'); 
        }
    }, []);

    return (
        <div>
            <h1>Token Get Page</h1>
        </div>
    );
}