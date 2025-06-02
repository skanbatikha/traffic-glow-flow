
import React, { useState, useEffect } from 'react';
import { CarCountCard } from '@/components/CarCountCard';
import { TrafficLightStatus } from '@/components/TrafficLightStatus';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { useWebSocket } from '@/hooks/useWebSocket';
import { startDemoMode } from '@/utils/demoData';

interface TrafficData {
  carCounts: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  trafficLights: {
    lane: string;
    status: 'red' | 'yellow' | 'green';
    timestamp: number;
  }[];
}

const Index = () => {
  const [trafficData, setTrafficData] = useState<TrafficData>({
    carCounts: { north: 0, south: 0, east: 0, west: 0 },
    trafficLights: []
  });
  const [isDemoMode, setIsDemoMode] = useState(false);

  const { isConnected, lastMessage } = useWebSocket('ws://localhost:5000/ws');

  // Start demo mode if not connected after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConnected && !isDemoMode) {
        setIsDemoMode(true);
        console.log('Starting demo mode - Flask server not connected');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isConnected, isDemoMode]);

  // Handle demo mode
  useEffect(() => {
    if (isDemoMode) {
      const stopDemo = startDemoMode((data) => {
        try {
          const parsedData = JSON.parse(data);
          setTrafficData(parsedData);
        } catch (error) {
          console.error('Error parsing demo data:', error);
        }
      });

      return stopDemo;
    }
  }, [isDemoMode]);

  // Handle real WebSocket messages
  useEffect(() => {
    if (lastMessage && !isDemoMode) {
      try {
        const data = JSON.parse(lastMessage);
        setTrafficData(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage, isDemoMode]);

  const lanes = [
    { direction: 'north', emoji: '⬆️', color: 'from-blue-500 to-blue-600' },
    { direction: 'south', emoji: '⬇️', color: 'from-green-500 to-green-600' },
    { direction: 'east', emoji: '➡️', color: 'from-purple-500 to-purple-600' },
    { direction: 'west', emoji: '⬅️', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🚦 Live Traffic Dashboard
          </h1>
          <p className="text-xl text-gray-300">Real-time car counts and traffic light monitoring</p>
          <ConnectionStatus isConnected={isConnected} />
          {isDemoMode && (
            <div className="mt-2">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                🔄 Demo Mode Active - Simulated Data
              </span>
            </div>
          )}
        </div>

        {/* Car Counts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            📊 Live Car Counts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lanes.map((lane) => (
              <CarCountCard
                key={lane.direction}
                direction={lane.direction}
                count={trafficData.carCounts[lane.direction as keyof typeof trafficData.carCounts]}
                emoji={lane.emoji}
                colorGradient={lane.color}
              />
            ))}
          </div>
        </div>

        {/* Traffic Light Status */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            🚦 Traffic Light Status
          </h2>
          <TrafficLightStatus trafficLights={trafficData.trafficLights} />
        </div>
      </div>
    </div>
  );
};

export default Index;
