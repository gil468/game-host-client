import {
  Button
} from "@mui/material";
import { HttpStatusCode } from "axios";
import useRequests from "../hooks/useRequests";
import useRelativeNavigate from "../hooks/useRelativeNavigate";

const MainPage = () => {
    const {createGame} = useRequests();
    const navigate = useRelativeNavigate();

    const launchNewGame = async () => {
      const res = await createGame();
      if (res.status === HttpStatusCode.Ok) navigate('/game', { state:{pinCode : res.data}})
    };
  
  
    return (
      <Button variant="contained" size="large" onClick={launchNewGame}>
          Host New Game
      </Button>
    );
  };
  
  export default MainPage;
  