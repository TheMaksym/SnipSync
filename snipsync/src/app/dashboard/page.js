"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import YoutubeBox from "../../components/YoutubeBox";
import TwitchBox from "../../components/TwitchBox";
import Post from "../../components/Post";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.css"; // Ensure the CSS module is correctly named and imported
import axios from "axios";
import { useRouter } from "next/navigation";

//Returns list of channelID's from subscriptions
function fetchSubscriptions(token) {
  const url = "http://localhost:5050/youtube/User/Subscriptions";
  return axios.get(url, { params: { token: token } });
}

//Returns list of videoID's from channelID
function fetchVideosFromSubscription(channelID) {
  const url = "http://localhost:5050/youtube/Channels/Uploads";
  return axios.get(url, { params: { channelID: channelID } });
}

async function fetchStreams(token) {
  const url = "http://localhost:5050/twitch/userID/" + token;
  const id = await axios.get(url);
  const url2 =
    "http://localhost:5050/twitch/followedStreams/" + token + "/" + id.data;
  return await axios.get(url2);
}

export default function Dashboard() {
  //Set data for the videos
  const [youtubeVideoIds, setYoutubeVideoIDs] = useState([]);
  const [twitchStreams, setTwitchStreams] = useState([]);
  const twitchChannelName = "drututt"; //example for twitch, will implement later
  const { push } = useRouter();
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    const twitchToken = localStorage.getItem("access_token_twitch");
    const authenticated = localStorage.getItem("authenticated") === "true";
    if (!authenticated) {
      push("/");
    }
    if(twitchToken != ""){
      fetchStreams(twitchToken).then((response) => {
        setTwitchStreams(response.data);
      });
    }
    
    fetchSubscriptions(userToken)
      .then((response) => {
        //Get channelID list
        const channelIDs = response.data.slice(0, 5); // Get the first 5 channels
        return Promise.all(
          channelIDs.map((id) => fetchVideosFromSubscription(id))
        );
      })
      .then((responses) => {
        //Turns the array of channels into one big list of videos, 2 from each channel
        const videoIDs = responses.map((res) => res.data.slice(0, 2)).flat();
        setYoutubeVideoIDs(videoIDs);
      })
      .catch((error) => {
        console.error("Error fetching from local backend: ", error);
      });

      //const videoIDs = [ 'M4Rle1fGZXM']
      //setYoutubeVideoIDs(videoIDs);

  }, []);

  return (
    <>
      <Navbar isUserAuthenticated={true} activeLink="dashboard" />
      <div className={styles.Home}>
        <div className={styles.Content}>
          <h3 className={styles.h3}>Welcome to your Dashboard</h3>
          <div className={styles.ApiContainers}>
              {youtubeVideoIds.map((embedId) => (
                <Post embedId={embedId}></Post>
              ))}
              {twitchStreams.map((channelName) => (
                <TwitchBox channelName={channelName} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

YoutubeBox.propTypes = {
  embedId: PropTypes.string.isRequired,
};

TwitchBox.propTypes = {
  channelName: PropTypes.string.isRequired,
};
