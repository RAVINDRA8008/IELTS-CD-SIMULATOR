import React, { useState } from 'react';
import { Mic, Flag } from 'lucide-react';
import { Question } from '../../types/test';
import { micService } from '../../services/speechRecognition';

interface GapFillQuestionProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (qId: number, val: string) => void;
  isFlagged: boolean;
  onToggleFlag: (qId: number) => void;
  micEnabled: boolean;
}

export const GapFillQuestion: React.FC<GapFillQuestionProps> = ({
  question,
  userAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag,
  micEnabled
}) => {
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const handleStartMic = () => {
    if (!micEnabled) return;
    setMicError(null);
    setIsListening(true);

    micService.startListening(
      (dictatedText) => {
        onAnswerChange(question.id, dictatedText);
        setIsListening(false);
      },
      (err) => {
        setMicError(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;

  return (
    <div className={`p-4 bg-white border transition-all ${
      isFlagged
        ? 'border-amber-400 bg-amber-50/20'
        : userAnswer
        ? 'border-slate-300'
        : 'border-slate-200'
    }`}>
      {/* Header Row: Question ID, Instruction, and Difficulty Metrics */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs bg-[#0f172a] text-white px-2 py-0.5 rounded-xs">
            {question.id}
          </span>
          <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider">
            {question.instruction}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Institutional Difficulty Metric */}
          <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200">
            {question.difficultyProfile.level.toUpperCase()} • {question.difficultyProfile.difficulty}/10
          </span>

          <button
            onClick={() => onToggleFlag(question.id)}
            className={`p-1 rounded-xs border transition ${
              isFlagged
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title="Review question"
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="text-sm font-semibold text-slate-900 mb-3">
        {question.prompt}
      </div>

      {/* Answer Workspace with inline context */}
      <div className="p-3 bg-[#f8fafc] border border-slate-200 rounded-xs flex flex-wrap items-center gap-2 text-sm text-slate-800">
        {question.contextBefore && (
          <span className="font-medium text-slate-700">{question.contextBefore}</span>
        )}

        <div className="relative inline-flex items-center">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            placeholder="Type answer..."
            className="ielts-input w-48 sm:w-64 px-3 py-1.5 text-sm font-mono focus:bg-white"
          />

          {micEnabled && (
            <button
              type="button"
              onClick={handleStartMic}
              disabled={isListening}
              className={`ml-1.5 p-1.5 rounded-xs border transition-all ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse border-red-700'
                  : 'bg-white text-slate-600 hover:text-slate-950 border-slate-300'
              }`}
              title={isListening ? "Listening..." : "Dictate via microphone"}
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>

        {question.contextAfter && (
          <span className="font-medium text-slate-700">{question.contextAfter}</span>
        )}
      </div>

      {/* Word Count & Status */}
      <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-slate-400">
        <span>Word Count: <strong className="text-slate-800">{wordCount}</strong></span>
        {isListening && (
          <span className="text-red-600 font-bold animate-pulse">
            ● RECORDING SPOKEN ANSWER...
          </span>
        )}
        {micError && (
          <span className="text-red-600">{micError}</span>
        )}
      </div>
    </div>
  );
};
