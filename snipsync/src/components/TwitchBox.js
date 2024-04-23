// Navbar.js

'use client'
import React, { useState } from 'react';
import styles from './TwitchBox.module.css';
import Image from 'next/image';
import Link from 'next/link';

const TwitchBox = ({ channelName }) => {
  return (
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
}

export default TwitchBox;