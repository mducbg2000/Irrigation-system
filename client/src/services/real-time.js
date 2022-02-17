import React from "react";
import { getCurrentUser } from "./auth";
import { socket } from "./conf";

socket.on("connect", async () => {
  const user = await getCurrentUser();
  socket.emit("login", user._id)
})

export const SocketContext = React.createContext(socket);