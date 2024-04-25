"use client";

import Navbar from "../../components/Navbar";
import NavbarProfile from "@/components/NavbarProfile";
import styles from "./profile.module.css";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import axios from "axios";

async function getUserInformation(username) {
  const result = await axios.get(
    "http://localhost:5050/user/Single/" + username
  );
  return result.data;
}

async function updateProfile(id, username, password, email){
  const url = "http://localhost:5050/user/Single/" + id;
  const body = {
    username : username,
    password : password,
    email : email
  }
  const result = await axios.patch(url, body);
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId]= useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setUsername(storedName);
    getUserInformation(localStorage.getItem("username")).then((response) => {
      setEmail(response.email);
      setPassword(response.password);
      setId(response._id);
    });
  }, []);

  const handleSubmit = () => {
    updateProfile(id, username, password, email);
    localStorage.setItem("username", username);
  }



  return (
    <div className={styles.Home}>
      <>
        <Navbar isUserAuthenticated={true} activeLink="dashboard" />
        <NavbarProfile />
      </>
      <div className={styles.main}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <p>Email</p>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Username</p>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>Password</p>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.submit} type="submit">Confirm Profile Changes</button>
        </form>
      </div>
    </div>
  );
}
