import { useState, useEffect, useRef } from 'react';

/**
 * @param serverStartTime  
 * @param durationLimit   
 * @param onTimeout       
 * @param paused           
 */
export function useServerAnchoredTimer(
  serverStartTime: number | null,
  durationLimit: number,
  onTimeout: () => void,
  paused = false
) {
  const [elapsed, setElapsed] = useState<number>(() => {
    if (!serverStartTime) return 0;
    return Math.floor((Date.now() - serverStartTime) / 1000);
  });

  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!serverStartTime || paused) return;

    hasTriggeredRef.current = false;

    const tick = () => {
      const newElapsed = Math.floor((Date.now() - serverStartTime) / 1000);
      setElapsed(newElapsed);

      if (
        durationLimit > 0 &&
        newElapsed >= durationLimit &&
        !hasTriggeredRef.current
      ) {
        hasTriggeredRef.current = true;
        onTimeoutRef.current();
      }
    };

    tick(); 
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [serverStartTime, durationLimit, paused]);

  const remaining =
    durationLimit > 0 ? Math.max(0, durationLimit - elapsed) : null;

  return { elapsed, remaining };
}