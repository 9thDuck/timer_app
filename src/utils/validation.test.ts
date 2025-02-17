import { describe, it, expect, beforeEach } from 'vitest';
import { validateTimerForm, TimerFormData } from './validation';
import { toast } from 'sonner';
import { vi } from 'vitest';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

describe('validateTimerForm', () => {
  const validData: TimerFormData = {
    title: 'Test Timer',
    description: 'Test Description',
    hours: 1,
    minutes: 30,
    seconds: 0
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return true for valid data', () => {
    const result = validateTimerForm(validData);
    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should validate empty title', () => {
    const result = validateTimerForm({ ...validData, title: '' });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title is required');
  });

  it('should validate title length', () => {
    const result = validateTimerForm({
      ...validData,
      title: 'a'.repeat(51)
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title must be less than 50 characters');
  });

  it('should validate negative time values', () => {
    const result = validateTimerForm({
      ...validData,
      hours: -1,
      minutes: 0,
      seconds: 0
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Time values cannot be negative');
  });

  it('should validate minutes and seconds range', () => {
    const result = validateTimerForm({
      ...validData,
      minutes: 60,
      seconds: 0
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Minutes and seconds must be between 0 and 59');
  });

  it('should validate total time greater than 0', () => {
    const result = validateTimerForm({
      ...validData,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Please set a time greater than 0');
  });

  it('should validate maximum time limit', () => {
    const result = validateTimerForm({
      ...validData,
      hours: 25,
      minutes: 0,
      seconds: 0
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Timer cannot exceed 24 hours');
  });
}); 