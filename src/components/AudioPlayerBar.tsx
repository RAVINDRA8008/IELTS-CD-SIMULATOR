import React from 'react';
import { Volume2, VolumeX, Play, Pause, AlertCircle, Lock, RotateCcw, Activity } from 'lucide-react';
import { TTSState } from '../services/ttsEngine';

interface AudioPlayerBarProps {
  ttsState: TTSState;
  isPlaying: boolean;
  isPracticeMode: boolean;
  volume: number;
  onVolumeChange: (vol: number) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  onTogglePlay: () => void;
  onRestartAudio: () => void;
  activeSectionNum: number;
  highContrast: boolean;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  ttsState,
  isPlaying,
  isPracticeMode,
  volume,
  onVolumeChange,
  playbackSpeed,
  onSpeedChange,
  onTogglePlay,
  onRestartAudio,
  activeSectionNum,
  highContrast
}) => {
  const cycleSpeed = () => {
    const speeds = [0.85, 0.95, 1.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    onSpeedChange(speeds[nextIdx]);
  };
  return (
    <div className={`${
      highContrast ? 'bg-black text-yellow-300 border-yellow-500' : 'bg-[#1e293b] text-slate-200 border-slate-700'
    } px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b text-xs select-none shadow-xs`}>
      {/* Left: Section Audio Track & Wave Monitor */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold uppercase tracking-wider text-xs">
            Part {activeSectionNum} Audio Stream
          </span>

          <span className={`px-2 py-0.5 rounded-xs font-mono font-bold text-[10px] tracking-wider flex items-center gap-1 ${
            isPlaying
              ? 'bg-emerald-500 text-slate-950 font-black'
              : ttsState.status === 'paused'
              ? 'bg-amber-400 text-slate-950 font-black'
              : 'bg-slate-700 text-slate-300'
          }`}>
            <Activity className={`w-3 h-3 ${isPlaying ? 'animate-pulse' : ''}`} />
            <span>{isPlaying ? 'PLAYING' : ttsState.status === 'paused' ? 'PAUSED' : 'READY'}</span>
          </span>
        </div>

        {/* Live Speaker Monitor */}
        {ttsState.currentSpeaker && (
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 border-l border-slate-700 pl-3 font-mono text-[11px]">
            <span>Speaker:</span>
            <span className="text-white font-semibold">{ttsState.currentSpeaker}</span>
            {ttsState.totalTurns > 0 && (
              <span className="text-slate-400">
                [{ttsState.currentTurnIndex}/{ttsState.totalTurns}]
              </span>
            )}
          </div>
        )}
      </div>

      {/* Center: Examination Security Standard */}
      <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
        <Lock className="w-3.5 h-3.5 text-amber-400" />
        <span>Official Cambridge Security: Transcript hidden during exam session</span>
      </div>

      {/* Right: Sound Controls & Volume */}
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xs font-mono font-bold text-xs transition ${
            isPlaying
              ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
              : 'bg-white hover:bg-slate-100 text-slate-950 border border-slate-300 shadow-xs'
          }`}
          title={isPracticeMode ? "Play / Pause Audio" : "Start Test Audio"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>{isPracticeMode ? 'PAUSE' : 'PLAYING'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{ttsState.status === 'paused' ? 'RESUME' : 'START AUDIO'}</span>
            </>
          )}
        </button>

        {/* Speed Adjustment Control */}
        <button
          onClick={cycleSpeed}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-mono font-bold rounded-xs transition"
          title={`Speech Tempo: ${playbackSpeed}x (Click to cycle between 0.85x, 0.95x, 1.0x)`}
        >
          <span>{playbackSpeed}x</span>
        </button>

        {isPracticeMode && (
          <button
            onClick={onRestartAudio}
            className="p-1 text-slate-400 hover:text-white transition"
            title="Replay from beginning of Part"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Volume Level */}
        <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
          <button
            onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
            className="text-slate-400 hover:text-white transition"
            title={volume === 0 ? "Unmute" : "Mute"}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-slate-700 rounded-xs appearance-none cursor-pointer accent-white"
            title="Adjust volume"
          />
          <span className="font-mono text-[10px] text-slate-400 w-7 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Audio Error Fallback */}
      {ttsState.errorMessage && (
        <div className="w-full bg-red-950 border border-red-800 text-red-200 text-xs px-3 py-1.5 rounded-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>Audio stream warning: {ttsState.errorMessage}</span>
          </div>
          <button
            onClick={onRestartAudio}
            className="underline font-bold hover:text-white font-mono"
          >
            RETRY
          </button>
        </div>
      )}
    </div>
  );
};
