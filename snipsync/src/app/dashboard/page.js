'use client'

import React from 'react';
import Navbar from '../../components/Navbar';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css'; // Ensure the CSS module is correctly named and imported

const YoutubeEmbed = ({ embedId }) => (
  <div className={styles.videoResponsive}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

const TwitchEmbed = ({ channelName }) => (
  <div className={styles.videoResponsive}>
    <iframe
      src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost`} // Replace yourwebsite.com with your actual domain
      height="480"
      width="853"
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
    ></iframe>
  </div>
);

export default function Dashboard() {
  // These IDs or channel names could come from the user's preferences or your API
  const youtubeEmbedId = 'HbHF3KajnQQ'; //yourYoutubeEmbedId (THIS IS THE VARIABLE NAME) 3dHpEfmegOA
  const twitchChannelName = 'moistcr1tikal'; //yourTwitchChannelName (THIS IS THE VARIABLE NAME) summit1g, shroud

  return (
    <>
      <Navbar isUserAuthenticated={true} activeLink="dashboard" />
      <div className={styles.Home}>
        <div className={styles.Content}>
          <h3 className={styles.h3}>Welcome to your Dashboard</h3>
          <div className={styles.ApiContainers}>
            <YoutubeEmbed embedId={youtubeEmbedId} />
            <TwitchEmbed channelName={twitchChannelName} />
          </div>
        </div>
      </div>
    </>
  );
}

TwitchEmbed.propTypes = {
  channelName: PropTypes.string.isRequired,
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};


