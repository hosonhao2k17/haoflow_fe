'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket, disconnectSocket } from '@/lib/socket';

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = getSocket();
        socketRef.current = socket;

        if (!socket.connected) {
            socket.connect();
        }

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err.message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    const emit = useCallback((event: string, data?: any) => {
        socketRef.current?.emit(event, data);
    }, []);

    const on = useCallback((event: string, callback: (...args: any[]) => void) => {
        socketRef.current?.on(event, callback);
        return () => socketRef.current?.off(event, callback); 
    }, []);

    const off = useCallback((event: string, callback?: (...args: any[]) => void) => {
        socketRef.current?.off(event, callback);
    }, []);

    return {
        socket: socketRef.current,
        emit,
        on,
        off,
        disconnect: disconnectSocket,
    };
};