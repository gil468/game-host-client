import {
  Button
} from "@mui/material";
import { HttpStatusCode } from "axios";
import { createGameRequest } from "../hooks/useRequests";
import { useNavigate } from "react-router-dom";

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
  