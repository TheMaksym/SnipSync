const express = require( "express");
const db = require( "../db/connection.js");
const axios = require( "axios");

//------------------------------------------------------------DOCUMENTATION------------------------------------------------------------//
//List of functions and explanations
//1. localhost:5050/youtube/Search/String?search={SEARCH STRING HERE}
//Will return unformatted result of searching on youtube with the search string, uses 100 tokens very not pog
//
//2. localhost:5050/youtube/Channels/Uploads?channel={CHANNEL ID HERE}
//Gets bare list of video ids from youtube channel, give it the channel id
//
//3. localhost:5050/youtube/User/Signin
//Don't input anything. It just redirects you to youtube so you can sign in. After that it redirects to the youtubetoken page.
//
//4. localhost:5050/youtube/User/Subscriptions={ACCESS TOKEN HERE}
//Takes in access token, returns bare list of channelIDs (that you are subscribed to)

const router = express.Router();
const dotenv = require('dotenv').config({path:__dirname+"/../.env.local"});

//------------------------------------------------------------
//Top functions do not need OAuth Authentication

//TRY NOT TO CALL THIS ONE IT USES 100 QUOTA UNITS
//To call this: localhost:5050/youtube/Search/String?search=
router.get("/Search/String", async (req, res) => {
    const searchString = req.query.search; //Need 
    if (!searchString) {
        return res.status(404).send('NO SEARCH STRING BOZO');
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
            res.status(404).send('Out of tokens bozo🤣🤣🤣');
        });
});

//Use this method to steal all your tokens
//Gets information about a video from the id
// router.get("/Video/:id", async(req, res) => {
//     const url = "https://www.googleapis.com/youtube/v3/videos";
//     const params = {
//         key : process.env.YOUTUBE_API_KEY,
//         part : 'snippet',
//         id : req.params.id
//     }

//     const result = await axios.get(url, {params});
//     res.send(result.data).status(200);
// })


//Returns a list of channel uploads, given a channel id
//To call this: localhost:5050/youtube/Channels/Uploads?channel=
//1 parameter: channel
router.get("/Channels/Uploads", async (req, res) => {
    const channelID = req.query.channelID;
    if (!channelID) {
        return res.status(404).send('NO CHANNEL ID BOZO');
    }

    const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
    const apiChannelsUrl = "https://www.googleapis.com/youtube/v3/channels";
    const apiPlaylistItemsUrl = "https://www.googleapis.com/youtube/v3/playlistItems";

    const channelParams = {
        key: youtubeAPIKey,
        part: 'contentDetails',
        id: channelID,
    };

    try {
        //API call number 1, gets channel info, then extracts uploads ID (used to for playlists)
        const channelResponse = await axios.get(apiChannelsUrl, { params: channelParams });
        const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
        console.log("Uploads Playlist ID:", uploadsPlaylistId);

        // Second API call to get the playlist items (videos)
        const playlistParams = {
            key: youtubeAPIKey,
            part: 'snippet',
            playlistId: uploadsPlaylistId,
            maxResults: 10  // You can adjust this number or make it configurable
        };
        const playlistResponse = await axios.get(apiPlaylistItemsUrl, { params: playlistParams });

        // Get just the video ids into a list and send it
        const videoIDs = playlistResponse.data.items.map(item => item.snippet.resourceId.videoId);
        res.json(videoIDs);

    } catch (error) {
        console.log("ERROR: ", error);
    }
});

//------------------------------------------------------------------------
//These functions do need OAuth Authentication

//0 parameters, just go to the url, localhost:5050/youtube/User/Signin
router.get("/User/Signin", async(req, res) => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    const params = {
        client_id: process.env.YOUTUBE_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/getOauth/youtubetoken',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        include_granted_scopes: 'true',
        state: 'pass-through value'
    };

    //Makes the actual url
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const authUrl = `${oauth2Endpoint}?${queryString}`;

    //Redirects user to the google server, which will redirect the user to our youtubetoken page
    res.redirect(authUrl);
})

//To call this route, localhost:5050/youtube/User/Subscriptions?token=
//1 parameter: token
router.get("/User/Subscriptions", async (req, res) => {
    const user_token = req.query.token; //Get the token
    if (!user_token) {
        return res.status(400).send('NO ACCESS TOKEN BOZO');
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
            const channelIDs = response.data.items.map(item => item.snippet.resourceId.channelId);
            res.json(channelIDs); //Send the parsed channel ids to client
        })
        .catch(error => {
            console.log("ERROR: ");
            console.error(error);
            res.status(404).send('Youtube Subscriptions API Error');
        });
});

module.exports = router;