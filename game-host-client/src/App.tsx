import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from "./components/MainPage";
import GameInProgress from "./components/GameInProgress";
import { Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import GameRoutes from "./routes/GameRoutes";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/game/*" element={<GameRoutes/>}/>
        </Routes>
      </Router>
   </div>
  );
}

export default App;
