
// Demo data generator for testing without Flask backend
export const generateDemoTrafficData = () => {
  const lanes = ['north', 'south', 'east', 'west'];
  const statuses = ['red', 'yellow', 'green'] as const;
  
  return {
    carCounts: {
      north: Math.floor(Math.random() * 5) + 1,
      south: Math.floor(Math.random() * 5) + 1,
      east: Math.floor(Math.random() * 5) + 1,
      west: Math.floor(Math.random() * 5) + 1,
    },
    trafficLights: lanes.map(lane => ({
      lane,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: Date.now() - Math.floor(Math.random() * 60000)
    }))
  };
};

// Simulate WebSocket data for demo
export const startDemoMode = (callback: (data: string) => void) => {
  const interval = setInterval(() => {
    const data = generateDemoTrafficData();
    callback(JSON.stringify(data));
  }, 3000);

  return () => clearInterval(interval);
};
