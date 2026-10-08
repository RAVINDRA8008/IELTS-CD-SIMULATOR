import React from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { UserAnswers } from '../types/test';

interface QuestionPaletteProps {
  currentQuestionId: number;
  onSelectQuestion: (id: number) => void;
  userAnswers: UserAnswers;
  flaggedQuestions: Set<number>;
  onToggleFlag: (id: number) => void;
  onFinishTest: () => void;
  activeSectionNum: number;
  onSelectSection: (secNum: 1 | 2 | 3 | 4) => void;
  highContrast: boolean;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  currentQuestionId,
  onSelectQuestion,
  userAnswers,
  flaggedQuestions,
  onToggleFlag,
  onFinishTest,
  activeSectionNum,
  onSelectSection,
  highContrast
}) => {
  const isAnswered = (id: number): boolean => {
    const val = userAnswers[id];
    if (Array.isArray(val)) return val.length > 0;
    return Boolean(val && val.trim().length > 0);
  };

  const answeredCount = Object.keys(userAnswers).filter(id => isAnswered(Number(id))).length;
  const isCurrentFlagged = flaggedQuestions.has(currentQuestionId);

  return (
    <div className={`${
      highContrast ? 'bg-black text-yellow-300 border-yellow-500' : 'bg-[#0f172a] text-white border-slate-800'
    } border-t px-4 py-2 shrink-0 select-none shadow-lg`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Part Navigation & Review Flag */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          {/* Part Tabs */}
          <div className="flex items-center border border-slate-700 bg-slate-900 rounded-xs overflow-hidden">
            {([1, 2, 3, 4] as const).map((sNum) => {
              const isCurrent = activeSectionNum === sNum;
              const startQ = (sNum - 1) * 10 + 1;
              const endQ = sNum * 10;

              return (
                <button
                  key={sNum}
                  onClick={() => onSelectSection(sNum)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold transition ${
                    isCurrent
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Part {sNum} <span className="text-[10px] font-normal text-slate-400 hidden sm:inline">({startQ}–{endQ})</span>
                </button>
              );
            })}
          </div>

          {/* Authentic CD-IELTS Review Toggle & Step Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFlag(currentQuestionId)}
              className={`px-2.5 py-1 text-xs font-mono font-bold border transition rounded-xs flex items-center gap-1.5 ${
                isCurrentFlagged
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Flag question to review later"
            >
              <input
                type="checkbox"
                checked={isCurrentFlagged}
                onChange={() => onToggleFlag(currentQuestionId)}
                className="w-3.5 h-3.5 accent-amber-500 rounded-xs cursor-pointer"
              />
              <span className="hidden sm:inline">Review</span>
            </button>

            <button
              onClick={() => onSelectQuestion(Math.max(1, currentQuestionId - 1))}
              disabled={currentQuestionId <= 1}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded-xs text-xs font-mono font-bold flex items-center"
              title="Previous Question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectQuestion(Math.min(40, currentQuestionId + 1))}
              disabled={currentQuestionId >= 40}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded-xs text-xs font-mono font-bold flex items-center"
              title="Next Question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: 1-40 Clean Question Matrix */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full no-scrollbar">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((qId) => {
            const answered = isAnswered(qId);
            const flagged = flaggedQuestions.has(qId);
            const isActive = currentQuestionId === qId;

            return (
              <button
                key={qId}
                onClick={() => onSelectQuestion(qId)}
                className={`relative w-6 h-6.5 shrink-0 rounded-xs text-[11px] font-mono font-bold flex items-center justify-center transition-all ${
                  isActive
                    ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900 z-10'
                    : ''
                } ${
                  answered
                    ? 'bg-slate-200 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title={`Question ${qId}${answered ? ' (Answered)' : ' (Unanswered)'}${flagged ? ' [Flagged]' : ''}`}
              >
                {qId}
                {flagged && (
                  <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Progress & Finish Test Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="text-xs font-mono text-slate-400">
            <span className="text-white font-bold">{answeredCount}</span>/40 Answered
          </div>

          <button
            onClick={onFinishTest}
            className="px-4 py-1.5 bg-[#dc2626] hover:bg-red-700 text-white rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition border border-red-600 shadow-xs"
          >
            Finish Test
          </button>
        </div>
      </div>
    </div>
  );
};
