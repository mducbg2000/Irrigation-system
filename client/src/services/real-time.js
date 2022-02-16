import io from "socket.io-client"
import React from "react";
import { getCurrentUser } from "./auth";
import { NGROK_URL, token } from "./conf";

export const socket = io(NGROK_URL, {
  auth: {
    token: token
  }
});

socket.on("connect", async () => {
  const user = await getCurrentUser();
  socket.emit("login", user._id)
})

export const SocketContext = React.createContext(socket);