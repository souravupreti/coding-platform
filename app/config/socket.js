"use client";

const { io } = require("socket.io-client");

let socket = null;

export const getSocket = () => {
    if (!socket) {
        socket = io("http://localhost:3000", {
            autoConnect: true,
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });
    }
    return socket;
}
