'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function GetYoutubeToken() {
    //const router = useRouter();
    const [tokenDetails, setTokenDetails] = useState({
        accessToken: '',
        expiresIn: '',
        tokenType: '',
        scope: '',
    });

    useEffect(() => {
        const hash = window.location.hash.substring(1); // Removes the hash
        const params = new URLSearchParams(hash);
        //Saves all the parts
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');
        const tokenType = params.get('token_type');
        const scope = params.get('scope');

        if (accessToken) {
            setTokenDetails({ accessToken, expiresIn, tokenType, scope });
            // Store locally, for now
            localStorage.setItem('access_token', accessToken);
            console.log('Token saved to localStorage');
            
            // Redirect to the profile page instead when thats made
            //router.push('/dashboard'); 
        }
    }, []);

    return (
        <div>
            <h1>Token Received</h1>
            {tokenDetails.accessToken ? (
                <div>
                    <p>Access Token: {tokenDetails.accessToken}</p>
                    <p>Expires In: {tokenDetails.expiresIn}</p>
                    <p>Token Type: {tokenDetails.tokenType}</p>
                    <p>Scope: {tokenDetails.scope}</p>
                </div>
            ) : (
                <p>No token received yet.</p>
            )}
        </div>
    );
}