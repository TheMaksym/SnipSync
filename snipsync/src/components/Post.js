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

async function likePost(embedID, likes, username) {
  const body = {
    likes: likes + 1,
  };
  const response = await axios.patch(
    "http://localhost:5050/post/likes/" + embedID,
    body
  );

  const Body2 = {
    embedID
  }

  const response2 = await axios.patch("http://localhost:5050/user/Single/likes/" + username, {likes: Body2});

}

export default function Post(props) {
  const [newComment, setNewComment] = useState("");

  //Submits new comment
  const handleCommentSubmit = () => {
    const url = `http://localhost:5050/post/comments/${props.embedId}`;
    const url2 = "http://localhost:5050/user/single/comments/" +localStorage.getItem('username');
    const author = localStorage.getItem("username");

    //Remember, comments have both author, and new comment
    const newCommentData = {
      Author: author,
      Text: newComment,
    };

    axios.patch(url, { comments: newCommentData });
    axios.patch(url2, {comments: newCommentData});

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
    <>
      <div className={styles.post}>
        <h2 className="post-title">{title}</h2>
        <div className="video-container">
          <div className={styles.videoResponsive}>
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${props.embedId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
        <div className={styles.footer}>
          <button
            className={styles.likes}
            onClick={() => likePost(props.embedId, likes, localStorage.getItem('username'))}
          >
            Likes: {likes}
          </button>
          <span className={styles.comments}>
            COMMENTS
            {comments.map((data, index) => (
              <div key={index}>
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
              <button
                onClick={handleCommentSubmit}
                className={styles.commentButton}
              >
                Submit Comment
              </button>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}
