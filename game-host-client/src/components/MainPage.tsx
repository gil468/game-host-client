import {
  Button
} from "@mui/material";
import { HttpStatusCode } from "axios";
import { createGameRequest } from "../hooks/useRequests";
import GameNavigations from "../navigations/GameNavigations";

const MainPage = () => {
    const {goToWaitingRoom} = GameNavigations();

    const launchNewGame = async () => {
      const res = await createGameRequest();
      if (res.status === HttpStatusCode.Ok) goToWaitingRoom(res.data)
    };
  
  
    return (
      <Button variant="contained" size="large" onClick={launchNewGame}>
          Host New Game
      </Button>
    );
  };
  
  export default MainPage;
  