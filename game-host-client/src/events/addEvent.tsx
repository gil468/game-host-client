import { useEffect } from 'react';
import { io } from 'socket.io-client';

export type GameState = 'None' | 'WaitingRoom' | 'Running' | 'Buzzered' | 'BetweenRounds' | 'Ended';

interface AddEventProps {
    eventName: string;
    callback: (...args: any[]) => void;
    stateArray: GameState[];
    gameStatus : GameState;
}

const socket = io('http://localhost:3000'); // Singleton pattern

const useAddEvent = (props: AddEventProps) => {
    const { eventName, callback, stateArray, gameStatus } = props;
    
    useEffect(() => {
        if (stateArray.includes(gameStatus)) {
            socket.on(eventName, callback);
            console.log(gameStatus  + " : " + eventName + ' started');
            
            // Clean up the event listener on unmount or when dependencies change
            return () => {
                console.log(eventName + ' stopped');
                socket.off(eventName, callback);
            };
        }
    }, [eventName, callback, stateArray, gameStatus]); // Specify dependencies clearly
};

export default useAddEvent;
