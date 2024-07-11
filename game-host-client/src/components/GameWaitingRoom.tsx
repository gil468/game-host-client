import { Button, Typography } from "@mui/material";
import useRequests from "../hooks/useRequests";

interface MainPageProps {
    joinedPlayers : string[],
    pinCode : number
  }  

const GameWaitingRoom = (props : MainPageProps) => {
    const { nextSong } = useRequests();
    return (
        <>
         <Button variant="contained" size="large" onClick={nextSong}>
          Start Game
        </Button>
        <Typography variant="h4" fontWeight={'bold'}>{`Pincode : ${props.pinCode}`}</Typography>
        <div style={{display:'flex', gap : 4}}>{props.joinedPlayers.map(player => (
          <Typography>{player}</Typography>
        ))}</div>
        </>
    )
}

export default GameWaitingRoom;