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
      await axios.post("http://localhost:5050/post/", form);
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

  const [newComment, setNewComment] = useState(""); 

  const handleCommentSubmit = () => {
    // Logic to post the new comment
    console.log(newComment);
    setNewComment(""); // Reset the comment input after submission
  };

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
    }, []);
  });

  return (
    <div className={styles.postContainer}>
      <h2 className={styles.videoTitle}>{title}</h2>
      <YoutubeBox embedId={props.embedId} />
      <div className={styles.stats}>
        <span className={styles.likes}>Likes: {likes}</span>
        <span className={styles.comments}>Comments:</span>
        {comments.map((data, index) => (
          <div key={index} className={styles.comment}>
            <p>
              {data.Author} : {data.Text}
            </p>
          </div>
        ))}
        <div className={styles.commentForm}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={styles.commentInput}
          />
          <button onClick={handleCommentSubmit} className={styles.commentButton}>
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
}