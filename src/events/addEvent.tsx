import { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { GameStatusContext } from '../providers/GameStatusProvider';

export type GameState = 'None' | 'WaitingRoom' | 'Running' | 'Buzzered' | 'BetweenRounds' | 'Ended';

interface AddEventProps {
    eventName: string;
    callback: (...args: any[]) => void;
    stateArray: GameState[];
    newStatus? : GameState
}

const socket = io('http://localhost:3000'); // Singleton pattern

const useAddEvent = (props: AddEventProps) => {
    const { eventName, callback, stateArray , newStatus} = props;

    const {gameStatus, setGameStatus} = useContext(GameStatusContext);

    
    useEffect(() => {
        if (stateArray.includes(gameStatus)) {
            const handleEvent = (...args: any[]) => {
                callback(args);
                newStatus && setGameStatus(newStatus)
            }

            socket.on(eventName, handleEvent);
            console.log(gameStatus  + " : " + eventName + ' started');
            
            // Clean up the event listener on unmount or when dependencies change
            return () => {
                console.log(eventName + ' stopped');
                socket.off(eventName, handleEvent);
            };
        }
    }, [eventName, callback, stateArray, gameStatus, newStatus]); // Specify dependencies clearly
};

export default useAddEvent;
