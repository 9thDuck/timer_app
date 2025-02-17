import { useState, useEffect } from 'react';

export const useToastPosition = () => {
  const [position, setPosition] = useState<'top-right' | 'bottom-center'>(
    window.innerWidth >= 768 ? 'top-right' : 'bottom-center'
  );

  useEffect(() => {
    const handleResize = () => {
      setPosition(window.innerWidth >= 768 ? 'top-right' : 'bottom-center');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return position;
}; 