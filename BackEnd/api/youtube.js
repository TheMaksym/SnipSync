import express from "express";
import db from "../db/connection.js";
import axios from "axios"
//api call on http://localhost:5050/youtube/
//Used to fetch data and get console input
import fetch from "node-fetch";
import readline from 'readline';

const router = express.Router();


router.get("/search/", async (req, res) => {
    const searchString = req.query.search; // Assuming the search string is passed as a query parameter
    if (!searchString) {
        return res.status(400).send('Search string is required');
    }

    const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&q=${encodeURIComponent(searchString)}&type=video&part=snippet`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Youtube Fetch Success :):');
        console.log(JSON.stringify(data, null, 2)); 
        res.json(data); // Send the data back to the client
    } catch (error) {
        console.error('Youtube Fetch FAILED :(');
        res.status(500).send('Failed to fetch YouTube search results');
    }
});

router.get("/OAuth/Signin", async(req, res) => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Parameters to pass to OAuth 2.0 endpoint
    const params = {
        client_id: process.env.YOUTUBE_CLIENT_ID,
        redirect_uri: 'http://localhost:3000',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        include_granted_scopes: 'true',
        state: 'pass-through value'
    };

    // Construct the full URL with query parameters
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const authUrl = `${oauth2Endpoint}?${queryString}`;

    // Redirect the user to Google's OAuth 2.0 server
    res.redirect(authUrl);
})


export default router;