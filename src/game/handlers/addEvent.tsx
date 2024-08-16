import { useContext, useEffect } from 'react';
import {
  GameState,
  GameStatusContext,
} from '../../providers/GameStatusProvider';
import { socket } from '../../socketIO/SocketEmits';

interface AddEventProps {
  eventName: string;
  callback: (...args: any[]) => void;
  stateArray: GameState[];
  newStatus?: GameState;
}

const useAddEvent = (props: AddEventProps) => {
  const { eventName, callback, stateArray, newStatus } = props;

  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  useEffect(() => {
    if (stateArray.includes(gameStatus)) {
      const handleEvent = (...args: any[]) => {
        callback(...args);
        newStatus && setGameStatus(newStatus);
      };

      socket.on(eventName, handleEvent);

      // Clean up the event listener on unmount or when dependencies change
      return () => {
        socket.off(eventName, handleEvent);
      };
    }
  }, [eventName, callback, stateArray, gameStatus, newStatus]); // Specify dependencies clearly
};

export default useAddEvent;
