import { useMutation } from '@tanstack/react-query';
import { onAnalyticsApi } from '../services/api';
import type { EventName, TrackingEvent } from '../types/tracking.types';
import type { BackendResponse } from '../libs/shared/types/backend-response';

const useTrackBehavior = <T extends EventName>() => {
  const { mutate, isPending, isError, error } = useMutation<
    BackendResponse<{ message: string }>,
    Error,
    TrackingEvent<T>
  >({
    mutationFn: (payload) => onAnalyticsApi(payload),
    retry: 0,
    onSuccess: (data, variables) => {
      console.group(`✅ [TRACKING SUCCESS]: ${variables.eventName}`);
      console.log("Server Response:", data);
      console.log("Sent Payload:", {
        eventName: variables.eventName,
        sessionId: variables.sessionId,
        pageUrl: variables.pageUrl,
        metadata: JSON.parse(variables.metadata)
      });
      console.groupEnd();
    },
    onError: (err, variables) => {
      console.group(`❌ [TRACKING ERROR]: ${variables.eventName}`);
      console.error("Error Detail:", err);
      console.groupEnd();
    }
  });

  return { 
    track: mutate, 
    isPending, 
    isError, 
    error 
  };
};

export default useTrackBehavior;