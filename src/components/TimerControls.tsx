import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface TimerControlsProps {
  isRunning: boolean;
  remainingTime: number;
  duration: number;
  onToggle: () => void;
  onRestart: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  remainingTime,
  // duration,
  onToggle,
  onRestart,
}) => {
  const isCompleted = remainingTime <= 0;
  
  if (isCompleted) {
    return (
      <Button
        onClick={onRestart}
        variant="icon"
        icon={RotateCcw}
        title="Restart Timer"
        className="p-3 bg-blue-100 text-blue-600 hover:bg-blue-200"
      />
    );
  }

  return (
    <Button
      onClick={onToggle}
      variant="icon"
      icon={isRunning ? Pause : Play}
      title={isRunning ? 'Pause Timer' : 'Start Timer'}
      className={`p-3 ${
        isRunning
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-green-100 text-green-600 hover:bg-green-200'
      }`}
    />
  );
};