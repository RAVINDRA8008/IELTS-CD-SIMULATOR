import React from 'react';
import { Flag, CheckCircle2, Circle } from 'lucide-react';
import { Question } from '../../types/test';

interface MatchingQuestionProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (qId: number, val: string) => void;
  isFlagged: boolean;
  onToggleFlag: (qId: number) => void;
}

export const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  question,
  userAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag
}) => {
  const selectedLetter = (userAnswer || '').trim().toUpperCase();

  const handleSelect = (letter: string) => {
    onAnswerChange(question.id, letter);
  };

  return (
    <div className={`p-4 bg-white border transition-all ${
      isFlagged
        ? 'border-amber-400 bg-amber-50/20'
        : selectedLetter
        ? 'border-slate-300'
        : 'border-slate-200'
    }`}>
      {/* Header Row */}
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
          <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
            MATCHING
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200">
            {question.difficultyProfile.level.toUpperCase()}
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

      {/* Target Item Prompt to match */}
      <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xs">
        <div className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider mb-1">
          Target Feature to Classify:
        </div>
        <div className="text-sm font-black text-slate-900">
          {question.prompt}
        </div>
      </div>

      {/* Matching Options Box */}
      <div className="space-y-1.5">
        <div className="text-xs font-mono font-bold text-slate-600 mb-1">
          Choose the matching classification:
        </div>
        {question.options?.map((opt) => {
          const letter = opt.trim().charAt(0).toUpperCase();
          const isSelected = selectedLetter === letter;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(letter)}
              className={`w-full text-left p-3 rounded-xs border text-xs sm:text-sm flex items-center justify-between transition-all ${
                isSelected
                  ? 'border-[#0f172a] bg-slate-100 text-slate-950 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5.5 h-5.5 rounded-xs font-mono font-bold text-xs flex items-center justify-center border shrink-0 ${
                  isSelected
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}>
                  {letter}
                </span>
                <span>{opt.replace(/^[A-Z]\)\s*|^[A-Z]\s*-\s*/, '')}</span>
              </div>

              <div>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-[#0f172a]" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
