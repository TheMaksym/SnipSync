"use client";

import YoutubeBox from "./YoutubeBox";
import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";
import axios from "axios";

async function returnPostDetails(embedID) {
  const url = "http://localhost:5050/post/" + embedID;
  try {
    const result = await axios.get(url);
    if (result.data === "Not found") {
      const data = await axios.get(
        "http://localhost:5050/youtube/video/" + embedID
      );

      const form = {
        id: embedID,
        title: data.data.items[0].snippet.title,
        author: data.data.items[0].snippet.channelTitle,
        likes: 0,
        comments: [],
      };

      return form;
    } else {
      const form = {
        id: embedID,
        title: result.data.Title,
        author: result.data.Author,
        likes: result.data.Likes,
        comments: result.data.Comments,
      };

      return form;
    }
  } catch (err) {
    const body = {
      _id: embedID,
    };
  }
}

export default function Post(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    returnPostDetails(props.embedId).then((response) => {
      setTitle(response.title);
      setLikes(response.likes);
      setComments(response.comments);
      setAuthor(response.author);
    });
  });

  return (
    <>
      <p>{title}</p>
      <div>
        <p>By: {author}</p>
        <p>Likes: {likes}</p>
        <p>Comments: </p>
        {comments.map((data, index) => (
          <div key={index}>
            <p>Author: {data.Author}</p>
            <p>Text: {data.Text}</p>
          </div>
        ))}
      </div>
      <YoutubeBox embedId={props.embedId} />
      <p></p>
    </>
  );
}
