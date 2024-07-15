import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import GameRoutes from "./routes/GameRoutes";
import GameStatusProvider from "./providers/GameStatusProvider";
import MainPage from "./components/MainPage";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/game/*" element={<GameStatusProvider><GameRoutes/></GameStatusProvider>}/>
        </Routes>
      </Router>
   </div>
  );
}

export default App;
