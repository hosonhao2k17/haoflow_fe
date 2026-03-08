'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket, disconnectSocket } from './socket';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuthStore();
  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/mp3/alarm.wav');
    audioRef.current.volume = 1;
  }, []);

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      socketRef.current = null;
      return;
    }

    const socket = getSocket();
    socketRef.current = socket;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on('task_alarm', (data) => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn('[Audio] Không thể phát:', err.message);
        });
      }

      toast.warning(`⏰ ${data.title}`, {
        description: data.body,
        duration: 8000,
      });
    });

    return () => {
      socket.off('task_alarm');
      disconnectSocket();
    };
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);