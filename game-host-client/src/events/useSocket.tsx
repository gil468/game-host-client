import { useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {

    const [socket] = useState(io('http://localhost:3000'));

    return { socket}
}

export default useSocket;