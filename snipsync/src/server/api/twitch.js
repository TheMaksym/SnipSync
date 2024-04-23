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

router.get("/OAuth/ProvideToken", async(req, res) => {
    const url = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=" + process.env.TWITCH_CLIENT_ID + "&redirect_uri=http://localhost:3000/&scope=user%3Aread%3Afollows";
    res.send(url).status(200);
})



module.exports = router;