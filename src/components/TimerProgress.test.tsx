import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimerProgress } from './TimerProgress';

describe('TimerProgress', () => {
  it('renders with correct progress width', () => {
    const { container } = render(<TimerProgress progress={50} />);
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('handles 0% progress', () => {
    const { container } = render(<TimerProgress progress={0} />);
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  it('handles 100% progress', () => {
    const { container } = render(<TimerProgress progress={100} />);
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });

  it('handles decimal progress values', () => {
    const { container } = render(<TimerProgress progress={33.33} />);
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle({ width: '33.33%' });
  });
}); 