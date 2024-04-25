const express = require( "express");
const db = require("../db/connection.js");
const axios = require("axios")
//api call on http://localhost:5050/twitch/

const router = express.Router();
const dotenv = require('dotenv').config({path:__dirname+"/../.env.local"});
router.get("/", async (req, res) => {

    const apiUrl = "https://id.twitch.tv/oauth2/token";
    
    const headers = {
        'Content-Type' :'application/x-www-form-urlencoded'
    }

    const requestBody = {
        'client_id' : process.env.TWITCH_CLIENT_ID,
        'client_secret' : process.env.TWITCH_SECRET,
        'grant_type' : 'client_credentials'
    }

    axios.post(apiUrl, requestBody, {headers})
        .then(response =>{
            console.log("RESPONSE:");
            console.log(response.data);
        })
        .catch(error =>{
            console.log("ERROR: ");
            console.log(error);
        })

    res.send("Recieved").status(200);
});

router.get("/user/signin", async(req, res) => {
    const url = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=" + process.env.TWITCH_CLIENT_ID + "&redirect_uri=http://localhost:3000/getOauth/twitchtoken/&scope=user%3Aread%3Afollows";
    res.redirect(url);
})

router.get("/userID/:bearerToken", async(req, res) => {
    const token = req.params.bearerToken;
    const headers = {
        'Authorization' : 'Bearer ' + token,
        'Client-Id' : process.env.TWITCH_CLIENT_ID
    }
    const response = await axios.get('https://api.twitch.tv/helix/users', {
        headers : headers
    })

    res.send(response.data.data[0].id).status(200);

})

router.get("/followedStreams/:bearerToken/:userID", async(req, res) =>{

    const token = req.params.bearerToken;
    const userID = req.params.userID;

    const headers = {
        'Authorization' : 'Bearer ' + token,
        'Client-Id' : process.env.TWITCH_CLIENT_ID
    }

    const response = await axios.get('https://api.twitch.tv/helix/streams/followed?user_id='+userID, {
        headers : headers
    })

    const names = response.data.data.map(item => item.user_name)
    res.send(names).status(200);

}) 


module.exports = router;