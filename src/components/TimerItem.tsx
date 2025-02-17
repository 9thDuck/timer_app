import React, { useRef, useState } from 'react';
import { Trash2, RotateCcw, Pencil } from 'lucide-react';
import { Timer } from '../types/timer';
import { formatTime } from '../utils/time';
import { useTimerStore } from '../store/useTimerStore';
import { TimerControls } from './TimerControls';
import { TimerProgress } from './TimerProgress';
import { TimerModal } from './TimerModal';
import { Button } from './Button';

interface TimerItemProps {
  timer: Timer;
  stopAlarm: (timerId: string) => void;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer, stopAlarm }) => {
  const { toggleTimer, deleteTimer, restartTimer, stopAlarmPlaying } = useTimerStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const hasEndedRef = useRef(false);

  const handleRestart = () => {
    hasEndedRef.current = false;
    restartTimer(timer.id);
  };

  const handleDelete = () => {
    if (timer.isPlayingAlarm) {
      // First stop the alarm and audio
      stopAlarm(timer.id);
      stopAlarmPlaying(timer.id);
      
      // Use setTimeout to ensure alarm state is updated before deletion
      setTimeout(() => {
        deleteTimer(timer.id);
      }, 0);
    } else {
      deleteTimer(timer.id);
    }
  };

  const handleToggle = () => {
    if (timer.remainingTime <= 0) {
      hasEndedRef.current = false;
    }
    toggleTimer(timer.id);
  };

  return (
    <>
      <div className="relative bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-102 overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
            <path
              d="M50 20V50L70 70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{timer.title}</h3>
              <p className="text-gray-600 mt-1">{timer.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="icon"
                onClick={() => setIsEditModalOpen(true)}
                title="Edit Timer"
                icon={Pencil}
              />
              <Button
                variant="icon"
                onClick={handleRestart}
                title="Restart Timer"
                icon={RotateCcw}
              />
              <Button
                variant="danger"
                onClick={handleDelete}
                title="Delete Timer"
                icon={Trash2}
              />
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="text-4xl font-['Roboto_Mono'] font-bold text-gray-800 mb-4">
              {formatTime(timer.remainingTime)}
            </div>
            
            <TimerProgress
              progress={(timer.remainingTime / timer.duration) * 100}
            />
            
            <TimerControls
              isRunning={timer.isRunning}
              remainingTime={timer.remainingTime}
              duration={timer.duration}
              onToggle={handleToggle}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>

      <TimerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        timer={timer}
        mode="edit"
      />
    </>
  );
};