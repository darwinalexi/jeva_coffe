import { useEffect, useRef } from 'react';

export const useUserIdTimer = (onTimeout, timeout = 1 * 60 * 1000) => {
  const time = useRef(null);

  const resetTimer = () => {
    console.log("⏲️ Timer reiniciado por actividad del usuario");
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      console.log("💤 Tiempo de inactividad alcanzado");
      onTimeout();
    }, timeout);
  };

  const activity = () => {
    resetTimer();
  };

  useEffect(() => {
    window.addEventListener('mousemove', activity);
    window.addEventListener('keydown', activity);
    window.addEventListener('click', activity);

    resetTimer(); // Se activa al montar el componente

    return () => {
      window.removeEventListener('mousemove', activity);
      window.removeEventListener('keydown', activity);
      window.removeEventListener('click', activity);
      clearTimeout(time.current);
    };
  }, []);
};
