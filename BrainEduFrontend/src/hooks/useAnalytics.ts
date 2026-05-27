import { useCallback } from 'react';
import type { EventName, TrackingPayloads, TrackingEvent } from '../types/tracking.types';
import useTrackBehavior from './useBehavior';

const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const { track } = useTrackBehavior<EventName>();

  const trackEvent = useCallback(<T extends EventName>(
    eventName: T,
    payload: TrackingPayloads[T]
  ) => {
    const fullLogEvent: TrackingEvent<T> = {
      eventName,
      timestamp: new Date().toISOString(),
      sessionId: getOrCreateSessionId(),
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      metadata: JSON.stringify(payload),
    };

    track(fullLogEvent as any);
  }, [track]);

  return { trackEvent };
};