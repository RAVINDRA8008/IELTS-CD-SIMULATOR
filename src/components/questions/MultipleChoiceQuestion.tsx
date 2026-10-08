import React from 'react';
import { Flag, CheckSquare, Square, CheckCircle2, Circle } from 'lucide-react';
import { Question } from '../../types/test';

interface MultipleChoiceQuestionProps {
  question: Question;
  userAnswer: string | string[];
  onAnswerChange: (qId: number, val: string | string[]) => void;
  isFlagged: boolean;
  onToggleFlag: (qId: number) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  userAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag
}) => {
  const isMulti = question.type === 'multiple_choice_multi' || (question.maxSelectable && question.maxSelectable > 1);

  const selectedList: string[] = Array.isArray(userAnswer)
    ? userAnswer
    : userAnswer
    ? [userAnswer]
    : [];

  const handleSelect = (letter: string) => {
    if (isMulti) {
      const max = question.maxSelectable || 2;
      let updated: string[];
      if (selectedList.includes(letter)) {
        updated = selectedList.filter(l => l !== letter);
      } else {
        if (selectedList.length >= max) {
          updated = [...selectedList.slice(1), letter];
        } else {
          updated = [...selectedList, letter];
        }
      }
      onAnswerChange(question.id, updated);
    } else {
      onAnswerChange(question.id, letter);
    }
  };

  return (
    <div className={`p-4 bg-white border transition-all ${
      isFlagged
        ? 'border-amber-400 bg-amber-50/20'
        : selectedList.length > 0
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

      {/* Prompt */}
      <p className="text-sm font-semibold text-slate-900 mb-3 leading-snug">
        {question.prompt}
      </p>

      {/* Options List */}
      <div className="space-y-2">
        {question.options?.map((opt) => {
          const letter = opt.trim().charAt(0).toUpperCase();
          const isSelected = selectedList.includes(letter);

          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(letter)}
              className={`w-full text-left p-3 rounded-xs border text-xs sm:text-sm flex items-center justify-between transition-all ${
                isSelected
                  ? 'border-[#0f172a] bg-slate-100 text-slate-950 font-bold'
                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5.5 h-5.5 rounded-xs font-mono font-bold text-xs flex items-center justify-center border ${
                  isSelected
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}>
                  {letter}
                </span>
                <span>{opt.replace(/^[A-Z]\)\s*/, '')}</span>
              </div>

              <div>
                {isMulti ? (
                  isSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#0f172a]" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )
                ) : (
                  isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-[#0f172a]" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300" />
                  )
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
