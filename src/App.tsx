import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from "./components/MainPage";
import GameInProgress from "./components/GameInProgress";
import MusicMasterRouter from "./router/MusicMasterRouter";
import Navbar from "./components/Navbar";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Router>
        <MusicMasterRouter/>
      </Router>
   </div>
  );
}

export default App;
