
import React, { useEffect, useState } from 'react';
import { Car } from 'lucide-react';

interface CarCountCardProps {
  direction: string;
  count: number;
  emoji: string;
  colorGradient: string;
}

export const CarCountCard: React.FC<CarCountCardProps> = ({
  direction,
  count,
  emoji,
  colorGradient
}) => {
  const [previousCount, setPreviousCount] = useState(count);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (count !== previousCount) {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 600);
      setPreviousCount(count);
    }
  }, [count, previousCount]);

  const getIntensityLevel = (count: number) => {
    if (count >= 50) return 'high';
    if (count >= 20) return 'medium';
    return 'low';
  };

  const intensityColors = {
    low: 'ring-green-400 shadow-green-400/20',
    medium: 'ring-yellow-400 shadow-yellow-400/20',
    high: 'ring-red-400 shadow-red-400/20'
  };

  const intensity = getIntensityLevel(count);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorGradient} p-6 shadow-2xl ring-2 ${intensityColors[intensity]} transition-all duration-500 hover:scale-105 ${
        isUpdating ? 'scale-110' : ''
      }`}
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-white/10 animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">{emoji}</div>
          <Car className="h-8 w-8 text-white/80" />
        </div>
        
        <div className="text-white">
          <h3 className="text-lg font-semibold capitalize mb-2">{direction} Lane</h3>
          <div className="flex items-baseline">
            <span className={`text-5xl font-bold transition-all duration-500 ${
              isUpdating ? 'scale-125 text-yellow-300' : ''
            }`}>
              {count}
            </span>
            <span className="text-xl ml-2 text-white/80">cars</span>
          </div>
        </div>

        {/* Traffic intensity indicator */}
        <div className="mt-4 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            intensity === 'high' ? 'bg-red-400 animate-pulse' :
            intensity === 'medium' ? 'bg-yellow-400' :
            'bg-green-400'
          }`} />
          <span className="text-sm text-white/80 capitalize">{intensity} Traffic</span>
        </div>
      </div>

      {/* Update animation overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/20 animate-ping rounded-2xl" />
      )}
    </div>
  );
};
