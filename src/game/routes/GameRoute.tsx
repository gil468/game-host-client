import { Routes, Route, Navigate } from 'react-router-dom';
import GameCreatorPage from '../components/GameCreatorPage';
import InGameRoute from './InGameRoute';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GameCreatorPage />}></Route>
      <Route path="/:gameId/*" element={<InGameRoute />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default GameRoutes;
