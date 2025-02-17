import { useCallback } from 'react';
import { toast } from 'sonner';
import { TimerAudio } from '../utils/audio';
import { useTimerStore } from '../store/useTimerStore';

export const useAlarm = () => {
  const { setAlarmPlaying, stopAlarmPlaying } = useTimerStore();
  const timerAudio = TimerAudio.getInstance();
  const { timers } = useTimerStore();

  const startAlarm = useCallback((timerId: string, timerTitle: string) => {
    setAlarmPlaying(timerId);
    
    if (!timerAudio.getIsPlaying()) {
      timerAudio.play().catch(console.error);
    }
    
    const toastId = toast.success(`Timer "${timerTitle}" has ended!`, {
      duration: Infinity,
      action: {
        label: 'Dismiss',
        onClick: () => {
          stopAlarmPlaying(timerId);
          
          // Check if any timers are still playing alarms
          const hasActiveAlarms = timers.some(t => t.isPlayingAlarm);
          if (!hasActiveAlarms) {
            timerAudio.stop();
          }
          
          toast.dismiss(toastId);
        },
      },
    });

    return toastId;
  }, [setAlarmPlaying, stopAlarmPlaying, timerAudio, timers]);

  const stopAlarm = useCallback((timerId: string) => {
    stopAlarmPlaying(timerId);
    
    // Check if any timers are still playing alarms
    const hasActiveAlarms = timers.some(t => t.isPlayingAlarm);
    if (!hasActiveAlarms) {
      timerAudio.stop();
    }
  }, [stopAlarmPlaying, timerAudio, timers]);

  return {
    startAlarm,
    stopAlarm
  };
}; 