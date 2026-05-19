import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import useSaveLessonProgress from '../hooks/useSaveLessonProgress';

interface VideoPlayerProps {
  lessonId: number;
  videoUrl: string;
  title: string;
  isCompleted: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  lessonId,
  videoUrl, 
  title, 
  isCompleted, 
  hasPrev, 
  hasNext, 
  onPrev, 
  onNext 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const maxTimeWatched = useRef<number>(0);
  const isCompletedEmitted = useRef<boolean>(false);

  const { mutate: saveProgress } = useSaveLessonProgress();

  const getYouTubeId = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const videoId = getYouTubeId("https://www.youtube.com/watch?v=jNQXAC9IVRw");

  useEffect(() => {
    maxTimeWatched.current = 0;
    isCompletedEmitted.current = isCompleted;

    if (!videoId) return;

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      const playerElement = document.createElement('div');
      playerElement.id = `yt-player-${lessonId}`;
      playerElement.className = "w-full h-full";
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(playerElement);
      }

      playerRef.current = new window.YT.Player(`yt-player-${lessonId}`, {
        videoId: videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 1,
          disablekb: 1,
        },
        events: {
          onStateChange: handlePlayerStateChange,
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      stopProgressInterval();
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [lessonId, videoId]);

  const handlePlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      startProgressInterval();
    } else {
      stopProgressInterval();
    }
  };

  const startProgressInterval = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!playerRef.current || !playerRef.current.getCurrentTime) return;

      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();

      if (duration <= 0) return;

      if (currentTime > maxTimeWatched.current + 2) {
        playerRef.current.seekTo(maxTimeWatched.current, true);
        return;
      }

      if (currentTime > maxTimeWatched.current) {
        maxTimeWatched.current = currentTime;
      }

      const percent = Math.min(Math.round((maxTimeWatched.current / duration) * 100), 100);
      const isReachingRequirement = percent >= 80;

      if (isReachingRequirement && !isCompletedEmitted.current) {
        isCompletedEmitted.current = true;
        triggerSaveProgress(percent, true);
      } else if (Math.floor(currentTime) % 10 === 0 && currentTime > 0) {
        triggerSaveProgress(percent, isCompletedEmitted.current);
      }
    }, 1000);
  };

  const stopProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const triggerSaveProgress = (percent: number, completedStatus: boolean) => {
    saveProgress({
      lessonId: lessonId,
      progressPercent: percent,
      learningTime: Math.round(maxTimeWatched.current),
      completed: completedStatus
    });
  };

  const handleManualComplete = () => {
    if (isCompleted) return;
    triggerSaveProgress(100, true);
  };

  return (
    <div className="space-y-6">
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg relative">
        {videoId ? (
          <div ref={containerRef} className="w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Không tìm thấy URL video hợp lệ
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Trạng thái: {' '}
            <span className={`font-medium ${isCompleted ? 'text-green-600' : 'text-amber-600'}`}>
              {isCompleted ? 'Đã hoàn thành bài học' : 'Chưa hoàn thành'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            disabled={!hasPrev}
            onClick={onPrev}
            className="border border-gray-200 text-sm font-semibold text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft size={16} /> Bài trước
          </button>
          
          <button 
            onClick={handleManualComplete}
            disabled={isCompleted}
            className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm ${
              isCompleted 
                ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                : 'bg-[#0052cc] text-white hover:bg-[#0043a8]'
            }`}
          >
            <CheckCircle2 size={16} /> {isCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
          </button>
          
          <button 
            disabled={!hasNext || !isCompleted}
            onClick={onNext}
            className="border border-gray-200 text-sm font-semibold text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
            title={!isCompleted ? "Bạn cần học đạt tối thiểu 80% thời lượng để sang bài tiếp theo" : ""}
          >
            Bài tiếp <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;