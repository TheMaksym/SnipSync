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

async function likePost(embedID, likes){
  const body ={
    likes : likes+1
  }
  const response = await axios.patch("http://localhost:5050/post/likes/"+embedID, body)
  console.log(response);
}

export default function Post(props) {
  const [newComment, setNewComment] = useState(""); 

  //Submits new comment
  const handleCommentSubmit = () => {
    const url = `http://localhost:5050/post/comments/${props.embedId}`; 
    const author = localStorage.getItem('username');
    
    //Remember, comments have both author, and new comment
    const newCommentData = {
      Author: author,
      Text: newComment
    };
    console.log(author);
    console.log("comment submitted");
    console.log(newComment);
    console.log(newCommentData);
    console.log(comments);

    const updatedComments = [...comments, newCommentData];
    

    axios.put(url, { comment: newCommentData })
      .then(response => {
        console.log('Comment adding was successful!:', response.data);
        setComments(updatedComments);
        setNewComment(""); // Clear the input field
      })
      .catch(error => {
        console.error('Could not add comment:', error);
      });
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
          <span className={styles.likes}>Likes: {likes} By: {author}</span>
          <span className={styles.comments}>COMMENTS
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
            <button onClick={handleCommentSubmit} className={styles.commentButton}>
              Submit Comment
            </button>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}