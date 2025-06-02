
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
          isConnected
            ? 'bg-green-500/20 border-green-500/30 text-green-300'
            : 'bg-red-500/20 border-red-500/30 text-red-300'
        } transition-all duration-300`}
      >
        {isConnected ? (
          <Wifi className="h-5 w-5 animate-pulse" />
        ) : (
          <WifiOff className="h-5 w-5" />
        )}
        <span className="font-medium">
          {isConnected ? 'Connected to Flask Server' : 'Disconnected from Server'}
        </span>
      </div>
    </div>
  );
};
