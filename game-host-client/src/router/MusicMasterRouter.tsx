import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameInProgress from "../components/GameInProgress";
import MainPage from "../components/MainPage";
import AnswerPage from "../components/AnswerPage";
import EndGamePage from "../components/EndGamePage";

const MusicMasterRouter = () => {
    return (
    <Router>
      <Routes>
        <Route path="/game-in-progress" element={<GameInProgress />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/answer-revail" element={<AnswerPage/>} />
        <Route path="/end-game" element={<EndGamePage/>} />
      </Routes>
    </Router>
    )
}

export default MusicMasterRouter;