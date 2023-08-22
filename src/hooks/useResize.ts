import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useResize = () => {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const resizeHandler = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(width);
    setSize({
      width,
      height,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return size;
};
