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
function fetchPosts() {
  const url = "http://localhost:5050/post/";
  return axios.get(url, { params: {} });
}

export default function Posts() {
  //Post id is just the youtube video id
  const [postIDs, setPostIDs] = useState([]);
  useEffect(() => {
    fetchPosts().then((response) => {
      setPostIDs(response.data.map(post => post._id));
    });
  }, []);

  return (
    <>
      <Navbar isUserAuthenticated={true} activeLink="dashboard" />
      <div className={styles.Home}>
        <div className={styles.Content}>
          <h3 className={styles.h3}>See everybody's posts here!</h3>
          <div className={styles.ApiContainers}>
              {postIDs.map((embedId) => (
                <Post embedId = {embedId} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

Post.propTypes = {
  embedId: PropTypes.string.isRequired,
};