import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from "./components/MainPage";
import GameInProgress from "./components/GameInProgress";
import MusicMasterRouter from "./router/MusicMasterRouter";
import { Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import useSocket from "./hooks/useSocket";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <MusicMasterRouter/>
   </div>
  );
}

export default App;
