
import React from 'react';
import { Clock } from 'lucide-react';

interface TrafficLight {
  lane: string;
  status: 'red' | 'yellow' | 'green';
  timestamp: number;
}

interface TrafficLightStatusProps {
  trafficLights: TrafficLight[];
}

export const TrafficLightStatus: React.FC<TrafficLightStatusProps> = ({ trafficLights }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'red':
        return 'bg-red-500 shadow-red-500/50 animate-pulse';
      case 'yellow':
        return 'bg-yellow-500 shadow-yellow-500/50 animate-pulse';
      case 'green':
        return 'bg-green-500 shadow-green-500/50 animate-pulse';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'red': return '🔴';
      case 'yellow': return '🟡';
      case 'green': return '🟢';
      default: return '⚪';
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trafficLights.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🚦</div>
          <p className="text-gray-400 text-lg">Waiting for traffic light updates...</p>
        </div>
      ) : (
        trafficLights.map((light, index) => (
          <div
            key={`${light.lane}-${index}`}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 animate-scale-in"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg capitalize">
                {light.lane} Lane
              </h3>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {formatTime(light.timestamp)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Glowing status indicator */}
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-full ${getStatusColor(light.status)} shadow-2xl`}
                />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  {getStatusEmoji(light.status)}
                </div>
              </div>

              <div>
                <p className="text-white font-medium text-xl capitalize">
                  {light.status} Light
                </p>
                <p className="text-gray-400 text-sm">
                  Status changed to {light.status}
                </p>
              </div>
            </div>

            {/* Status badge */}
            <div className="mt-4">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  light.status === 'red'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : light.status === 'yellow'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}
              >
                Active: {light.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
