'use client'

import React from 'react';
import Navbar from '../../components/Navbar';
import YoutubeBox from '../../components/YoutubeBox';
import TwitchBox from '../../components/TwitchBox';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css'; // Ensure the CSS module is correctly named and imported

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
            <YoutubeBox embedId={youtubeEmbedId} />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <YoutubeBox embedId='Td_cbYevKqk' />
            <TwitchBox channelName={twitchChannelName} />
          </div>
        </div>
      </div>
    </>
  );
}

TwitchBox.propTypes = {
  channelName: PropTypes.string.isRequired,
};

YoutubeBox.propTypes = {
  embedId: PropTypes.string.isRequired,
};