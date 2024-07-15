import {
  Button
} from "@mui/material";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { createGameRequest } from "../game/handlers/GameRequests";

const MainPage = () => {
    const navigate = useNavigate();

    const launchNewGame = async () => {
      const res = await createGameRequest();
      if (res.status === HttpStatusCode.Ok)  navigate('/game', { state:{pinCode : res.data}})
    };
  
  
    return (
      <Button variant="contained" size="large" onClick={launchNewGame}>
          Host New Game
      </Button>
    );
  };
  
  export default MainPage;
  