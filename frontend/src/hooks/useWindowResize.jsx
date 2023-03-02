import { useEffect, useState } from 'react';

const useWindowResize = () => {
  const [windowResizing, setWindowResizing] = useState(false);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);

      setWindowResizing(true);

      timeout = setTimeout(() => {
        setWindowResizing(false);
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { windowResizing };
};
export default useWindowResize;
