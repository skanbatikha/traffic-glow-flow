
import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocketIO = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const connect = useCallback(() => {
    try {
      const newSocket = io(url, {
        transports: ['websocket'],
        autoConnect: true,
      });

      newSocket.on('connect', () => {
        console.log('Socket.IO connected');
        setIsConnected(true);
        setSocket(newSocket);
      });

      newSocket.on('traffic_data', (data) => {
        setLastMessage(JSON.stringify(data));
      });

      newSocket.on('disconnect', () => {
        console.log('Socket.IO disconnected');
        setIsConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
        setIsConnected(false);
      });

      socketRef.current = newSocket;

    } catch (error) {
      console.error('Failed to create Socket.IO connection:', error);
      setIsConnected(false);
    }
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((event: string, data: any) => {
    if (socket && socket.connected) {
      socket.emit(event, data);
    }
  }, [socket]);

  return {
    socket,
    lastMessage,
    isConnected,
    sendMessage
  };
};
