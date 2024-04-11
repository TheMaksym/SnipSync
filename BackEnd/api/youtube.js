import express from "express";
import db from "../db/connection.js";
import axios from "axios"
//api call on http://localhost:5050/youtube/
//Used to fetch data and get console input
import readline from 'readline';

const router = express.Router();

//Top functions do not need OAuth Authentication
router.get("/Search/", async (req, res) => {
    const searchString = req.query.search; // Assuming the search string is passed as a query parameter
    if (!searchString) {
        return res.status(400).send('Search string is required');
    }

    const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = "https://www.googleapis.com/youtube/v3/search";

    const params = {
        key: youtubeAPIKey,
        q: searchString,
        type: 'video',
        part: 'snippet',
    }

    axios.get(apiUrl, { params })
        .then(response => {
            console.log("RESPONSE:");
            console.log(response.data);
            res.json(response.data); // Send the YouTube data back to the client
        })
        .catch(error => {
            console.log("ERROR: ");
            console.error(error);
            res.status(500).send('Out of tokens bozo🤣🤣🤣');
        });
});


//Bottom functions need OAuth Authentication
router.get("/User/Signin", async(req, res) => {
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

router.get("User/Subscriptions/", async (req, res) => {
    const user_token = req.query.token; // Assuming the search string is passed as a query parameter
    if (!searchString) {
        return res.status(400).send('Search string is required');
    }

    const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = "https://www.googleapis.com/youtube/v3/subscriptions";

    const params = {
        access_token: user_token,
        mine: true,
        part: 'snippet',
    }

    axios.get(apiUrl, { params })
        .then(response => {
            console.log("RESPONSE:");
            console.log(response.data);
            res.json(response.data); // Send the YouTube data back to the client
        })
        .catch(error => {
            console.log("ERROR: ");
            console.error(error);
            res.status(500).send('Youtube Search API Error');
        });
});

export default router;