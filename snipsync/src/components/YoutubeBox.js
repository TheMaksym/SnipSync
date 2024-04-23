// Navbar.js

'use client'
import React, { useState } from 'react';
import styles from './YoutubeBox.module.css';
import Image from 'next/image';
import Link from 'next/link';

// export default function YoutubeEmbed(embedId) {
//   return(
    // <div className={styles.videoResponsive}>
    //   <iframe
    //     width="853"
    //     height="480"
    //     src={`https://www.youtube.com/embed/${embedId}`}
    //     frameBorder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //     allowFullScreen
    //     title="Embedded youtube"
    //   />
    // </div>
//   );
// }

const YoutubeBox = ({ embedId }) => {
  return (
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
};

export default YoutubeBox;