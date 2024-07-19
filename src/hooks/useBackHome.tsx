import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGameNavigation from "../game/handlers/useGameNavigation";

const useBackHome = <T extends any> () => {
    const { backToHome } = useGameNavigation();

    const state = useLocation().state;
    useEffect(() => {
        if (!state) backToHome();
      }, [state]);

    return state as T | undefined;
}

export default useBackHome;