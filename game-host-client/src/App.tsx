import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from "./components/MainPage";
import GameInProgress from "./components/GameInProgress";

function App() {
  return (
    // <div className="App">
    //   <MainPage />
    // </div>
    <Router>
      <Routes>
        <Route path="/game-in-progress" element={<GameInProgress />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
