"use client"
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Page1 } from "./Pages/Page1";
import { Page2 } from "./Pages/Page2";
import { Lay } from "./Components/Lay";


export default function App() {
  return (
    <Home/>
  );
}
