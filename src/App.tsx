import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';
import GameSettingsPage from './game/components/GameSettingsPage';

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <AppRouter /> */}
      <GameSettingsPage />
    </div>
  );
}

export default App;
