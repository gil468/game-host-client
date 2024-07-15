import { useContext } from "react"
import { GameStatusContext } from "../routes/GameRoutes"
import { useNavigate } from "react-router-dom";

const GameNavigations = () => {
    const {setGameStatus} = useContext(GameStatusContext);
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/')
        setGameStatus('None')
    }

    const answerRevail = (songName : string) => {
        navigate('/game/answer-revail', {state : {songName : songName}})
        setGameStatus('BetweenRounds')
    }

    const endGame = (winnerName : string) => {
        navigate('/game/end-game', {state : {gameWinner : winnerName}})
        setGameStatus('Ended')
    }

    const startGame = (songId : number) => {
        navigate('/game/game-in-progress', {state : {songId : songId}})
        setGameStatus('Running')
    }

    const goToWaitingRoom = (pinCode : number) => {
        navigate('/game', { state:{pinCode : pinCode}})
        setGameStatus('WaitingRoom')
    }

    return {backToHome, answerRevail, endGame,startGame, goToWaitingRoom}
}

export default GameNavigations