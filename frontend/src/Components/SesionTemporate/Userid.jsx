import { useEffect, useRef } from 'react';

export const useUserIdTimer = (onTimeout, timeout = 5 * 60 * 1000) => {
  const time = useRef(null);
  const callbackRef = useRef(onTimeout);


  useEffect(() => {
    callbackRef.current = onTimeout;
  }, [onTimeout]);

  const resetTimer = () => {
    clearTimeout(time.current);
    if (timeout) {
      time.current = setTimeout(() => {
        console.log("💤 Tiempo de inactividad alcanzado");
        callbackRef.current(); // ✅ aquí
      }, timeout);
    }
  };

  const activity = () => resetTimer();

  useEffect(() => {
    if (!timeout) return;

    window.addEventListener('mousemove', activity);
    window.addEventListener('keydown', activity);
    window.addEventListener('click', activity);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', activity);
      window.removeEventListener('keydown', activity);
      window.removeEventListener('click', activity);
      clearTimeout(time.current);
    };
  }, [timeout]);
};
