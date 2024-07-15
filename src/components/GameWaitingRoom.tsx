import { Button, Typography } from "@mui/material";
import { nextSongRequest } from "../hooks/useRequests";
import { useContext, useEffect } from "react";
import { GameStatusContext } from "../providers/GameStatusProvider";

interface MainPageProps {
    joinedPlayers : string[],
    pinCode : number
  }  

const GameWaitingRoom = (props : MainPageProps) => {
  const {setGameStatus} = useContext(GameStatusContext);

  useEffect(() => setGameStatus('WaitingRoom'),[])

    return (
        <>
         <Button variant="contained" size="large" onClick={nextSongRequest}>
          Start Game
        </Button>
        <Typography variant="h4" fontWeight={'bold'}>{`Pincode : ${props.pinCode}`}</Typography>
        <div style={{display:'flex', gap : 4}}>{props.joinedPlayers.map(player => (
          <Typography key={player}>{player}</Typography>
        ))}</div>
        </>
    )
}

export default GameWaitingRoom;