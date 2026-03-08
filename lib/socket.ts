import { useAuthStore } from '@/store/auth.store';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

let socket: Socket | null = null;
let currentToken: string | null = null; 

export const getSocket = (): Socket => {
  const token = useAuthStore.getState().accessToken;

  if (socket && currentToken !== token) {
    socket.disconnect();
    socket = null;
  }

  if (!socket) {
    currentToken = token;
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['polling', 'websocket'], 
      extraHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      auth: {
        token: token ? `Bearer ${token}` : null,
      },
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentToken = null;
  }
};