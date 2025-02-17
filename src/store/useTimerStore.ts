import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../types/timer';
import { useEffect } from 'react';

const initialState = {
  timers: [] as Timer[],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimers: (state, action) => {
      state.timers = action.payload;
    },
    addTimer: (state, action) => {
      const newTimers = [...state.timers, {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      }];
      state.timers = newTimers;
      persistTimers(newTimers);
    },
    deleteTimer: (state, action) => {
      const newTimers = state.timers.filter(timer => timer.id !== action.payload);
      state.timers = newTimers;
      persistTimers(newTimers);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
        persistTimers(state.timers);
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      console.log('timer', timer);
      if (timer && timer.isRunning) {
        timer.remainingTime -= 1;
        timer.isRunning = timer.remainingTime > 0;
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
        persistTimers(state.timers);
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
        persistTimers(state.timers);
      }
    },
    setAlarmPlaying: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isPlayingAlarm = true;
      }
    },
    stopAlarmPlaying: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isPlayingAlarm = false;
      }
    },
  },
});

const store = configureStore({
  reducer: timerSlice.reducer,
});

export { store };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
  setTimers,
  setAlarmPlaying,
  stopAlarmPlaying,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  useEffect(() => {
    const timersFromLocalStorage = localStorage.getItem('timers');
    if (timersFromLocalStorage && !timers.length) {
      dispatch(setTimers(JSON.parse(timersFromLocalStorage)));
    }
  }, [dispatch, timers.length]);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
    setAlarmPlaying: (id: string) => dispatch(setAlarmPlaying(id)),
    stopAlarmPlaying: (id: string) => dispatch(stopAlarmPlaying(id)),
  };
};

const persistTimers = (timers: Timer[]) => {
  localStorage.setItem('timers', JSON.stringify(timers));
}