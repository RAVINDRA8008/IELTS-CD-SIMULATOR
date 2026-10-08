import React, { useEffect, useState } from 'react';
import {
  Clock,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Settings,
  BookOpen,
  Layers,
  HelpCircle,
  Sun,
  Moon,
  Type,
  RotateCcw,
  Award,
  Check
} from 'lucide-react';
import { IELTSTest } from '../types/test';

interface HeaderProps {
  currentTest: IELTSTest;
  onOpenTestSelector: () => void;
  onOpenVoiceSettings: () => void;
  onOpenHistory: () => void;
  onRetake: () => void;
  isPracticeMode: boolean;
  onTogglePracticeMode: () => void;
  micEnabled: boolean;
  onToggleMic: () => void;
  onTimeExpired: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'standard' | 'large' | 'xlarge';
  onCycleFontSize: () => void;
  lastSavedAt?: Date | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTest,
  onOpenTestSelector,
  onOpenVoiceSettings,
  onOpenHistory,
  onRetake,
  isPracticeMode,
  onTogglePracticeMode,
  micEnabled,
  onToggleMic,
  onTimeExpired,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onCycleFontSize,
  lastSavedAt
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [showClock, setShowClock] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    setSecondsRemaining(30 * 60);
  }, [currentTest.id]);

  useEffect(() => {
    if (isPracticeMode) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPracticeMode, onTimeExpired, currentTest.id]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <header className={`${
      highContrast ? 'bg-black text-yellow-300 border-yellow-500' : 'bg-[#0b1329] text-white border-slate-800'
    } border-b px-4 py-2 shrink-0 select-none shadow-md`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official IELTS Wordmark & Candidate Metadata */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#e11d48] text-white font-black px-2.5 py-0.5 text-sm tracking-widest font-mono rounded-xs shadow-xs">
              IELTS
            </span>
            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-200 uppercase font-mono">
                Computer-Delivered Listening
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Candidate: RAVIN (CDL-9042) • Center: BC-LDN
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-700 hidden md:block" />

          {/* Test Switcher */}
          <button
            onClick={onOpenTestSelector}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded-xs border transition ${
              highContrast
                ? 'bg-yellow-950 text-yellow-300 border-yellow-500 hover:bg-yellow-900'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="Browse all 100 tests in repository"
          >
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span>TEST #{currentTest.id} / 100</span>
            <span className="text-[10px] text-slate-400 font-normal">▼</span>
          </button>

          {/* Test Attempt History Button */}
          <button
            onClick={onOpenHistory}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold rounded-xs border transition ${
              highContrast
                ? 'bg-yellow-950 text-yellow-300 border-yellow-500 hover:bg-yellow-900'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="View saved test attempts and past band scores"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">History</span>
          </button>

          {/* Reset / Retake Button with Confirmation */}
          <button
            onClick={() => {
              if (window.confirm(`Restart Test #${currentTest.id}? This will clear your entered answers and restart the audio and 30-minute timer.`)) {
                onRetake();
              }
            }}
            className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xs transition"
            title="Reset answers and retake this test"
          >
            <RotateCcw className="w-3 h-3 text-rose-400" />
            <span className="hidden md:inline">Restart</span>
          </button>

          {/* Real-time Save Status Pill */}
          {lastSavedAt ? (
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-xs" title="All entered answers are automatically saved to browser storage">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Saved</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-xs" title="Auto-saves as you type">
              <span>Auto-save ON</span>
            </div>
          )}
        </div>

        {/* Center: Official Cambridge Timer */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-xs border ${
          highContrast ? 'bg-black border-yellow-500' : 'bg-slate-900/90 border-slate-700'
        }`}>
          <Clock className={`w-3.5 h-3.5 ${
            secondsRemaining < 300 && !isPracticeMode ? 'text-red-400 animate-pulse' : 'text-slate-400'
          }`} />

          {isPracticeMode ? (
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-tight">
              PRACTICE (UNTIMED)
            </span>
          ) : (
            <>
              {showClock ? (
                <span className={`font-mono text-sm font-bold tracking-widest ${
                  secondsRemaining < 300 ? 'text-red-400' : 'text-white'
                }`}>
                  {timeFormatted} <span className="text-[10px] text-slate-400 font-normal">LEFT</span>
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-mono italic">Clock Hidden</span>
              )}

              <button
                onClick={() => setShowClock(!showClock)}
                className="text-slate-400 hover:text-white transition p-0.5 ml-1"
                title={showClock ? "Hide Clock" : "Show Clock"}
              >
                {showClock ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </>
          )}
        </div>

        {/* Right: Accessibility Controls & System Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Contrast Mode Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-1.5 rounded-xs border text-xs font-mono transition ${
              highContrast
                ? 'bg-yellow-300 text-black border-yellow-300 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle High Contrast Display (Official CD IELTS feature)"
          >
            {highContrast ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={onCycleFontSize}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono font-bold rounded-xs transition"
            title={`Text Size: ${fontSize.toUpperCase()} (Click to cycle)`}
          >
            <span className="text-[11px]">A</span>
            <span className="text-[9px] text-slate-400 ml-0.5">{fontSize === 'standard' ? '1x' : fontSize === 'large' ? '1.2x' : '1.4x'}</span>
          </button>

          {/* Mode Switch (Practice vs Exam) */}
          <button
            onClick={onTogglePracticeMode}
            className={`px-2 py-1 rounded-xs text-xs font-mono font-bold border transition ${
              isPracticeMode
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle between Strict Official Exam Mode and Practice Mode"
          >
            {isPracticeMode ? 'PRACTICE' : 'STRICT EXAM'}
          </button>

          {/* Microphone Dictation Mode */}
          <button
            onClick={onToggleMic}
            className={`p-1.5 rounded-xs border transition flex items-center gap-1.5 ${
              micEnabled
                ? 'bg-blue-950 text-blue-300 border-blue-600'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={micEnabled ? "Microphone Mode is ON (Click to disable)" : "Microphone Mode is OFF (Click to enable)"}
          >
            {micEnabled ? <Mic className="w-3.5 h-3.5 text-blue-400" /> : <MicOff className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-mono hidden xl:inline">MIC {micEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Help Popover Button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-1.5 rounded-xs border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Official Instructions & Keyboard Shortcuts"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Audio Engine Settings */}
          <button
            onClick={onOpenVoiceSettings}
            className="p-1.5 rounded-xs border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Audio & System Diagnostics"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Official Help Popover */}
      {showHelp && (
        <div className="absolute right-4 top-14 z-50 w-80 bg-[#0f172a] border border-slate-700 p-4 rounded-xs shadow-2xl text-xs space-y-2 text-slate-200 font-sans">
          <div className="font-mono font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-1.5 flex justify-between items-center">
            <span>Official CD IELTS Instructions</span>
            <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            • Listen to the recording and type or select answers as you listen.<br/>
            • Press <strong className="text-white font-mono">Tab</strong> to move to the next question blank.<br/>
            • Press <strong className="text-white font-mono">Shift + Tab</strong> to move to the previous blank.<br/>
            • Check the <strong className="text-amber-400 font-mono">[Review]</strong> box at the bottom to flag questions to revisit before submitting.
          </p>
        </div>
      )}
    </header>
  );
};
