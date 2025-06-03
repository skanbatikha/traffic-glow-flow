
import React from 'react';
import { Wifi } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  // Only show status when connected
  if (!isConnected) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex items-center space-x-2 px-4 py-2 rounded-full border bg-green-500/20 border-green-500/30 text-green-300 transition-all duration-300">
        <Wifi className="h-5 w-5 animate-pulse" />
        <span className="font-medium">
          Connected to Flask Server
        </span>
      </div>
    </div>
  );
};
