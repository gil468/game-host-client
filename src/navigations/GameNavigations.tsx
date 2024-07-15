import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { GameStatusContext } from "../providers/GameStatusProvider";

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

    return {backToHome, answerRevail, endGame,startGame}
}

export default GameNavigations