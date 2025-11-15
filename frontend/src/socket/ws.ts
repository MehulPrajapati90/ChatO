import { io } from "socket.io-client";

export function connectWS() {
    return io(import.meta.env.VITE_BASE_URL || 'http://localhost:3000/');
};