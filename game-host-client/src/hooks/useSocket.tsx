import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const useSocket = () =>
{
    const navigate = useNavigate();
    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.connect();

        socket.on('round-started', (x)=> {
            navigate('game-in-progress', {state : {songId : x.songId}})
        })
    },[])
}

export default useSocket;