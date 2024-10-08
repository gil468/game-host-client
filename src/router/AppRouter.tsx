import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MainPage from '../components/MainPage';
import GameStatusProvider from '../providers/GameStatusProvider';
import GameRoutes from '../game/routes/GameRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/game/*"
          element={
            <GameStatusProvider>
              <GameRoutes />
            </GameStatusProvider>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
