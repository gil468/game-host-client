import { useContext, useEffect, useMemo } from 'react';
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

  const { gameProps, setGameProps } = useContext(GameStatusContext);
  const gameStatus = useMemo(() => gameProps?.gameStatus, [gameProps]);

  useEffect(() => {
    if (gameStatus && stateArray.includes(gameStatus)) {
      const handleEvent = (...args: any[]) => {
        callback(...args);
        newStatus && setGameProps({ gameStatus: newStatus });
      };

      socket.on(eventName, handleEvent);

      // Clean up the event listener on unmount or when dependencies change
      return () => {
        socket.off(eventName, handleEvent);
      };
    }
  }, [eventName, callback, stateArray, newStatus]); // Specify dependencies clearly
};

export default useAddEvent;
