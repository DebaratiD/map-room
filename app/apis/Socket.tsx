"use client"
import { io } from "socket.io-client";

const socket = io('http://localhost:5000', {
    transports: ["websocket", "polling"], // Use both transports
  });


socket.on("connect", () => {
    console.log("Connected to the server!");
  });
  
  socket.on("disconnect", () => {
    console.log("Disconnected from the server!");
  });

export {socket};