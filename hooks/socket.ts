import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  socket = io("http://192.168.110.227:5000", {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
