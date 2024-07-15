import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../components/MainPage";
import GameStatusProvider from "../providers/GameStatusProvider";
import GameRoutes from "./GameRoutes";

const AppRouter = () => {
    return (
        <Router>
        <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/game/*" element={<GameStatusProvider><GameRoutes/></GameStatusProvider>}/>
        </Routes>
        </Router>
    )
}
export default AppRouter;