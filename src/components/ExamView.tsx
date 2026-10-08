import React, { useEffect, useRef } from 'react';
import { Section, Question, UserAnswers } from '../types/test';
import { GapFillQuestion } from './questions/GapFillQuestion';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { AlertCircle, Info, FileSpreadsheet, Headphones } from 'lucide-react';

interface ExamViewProps {
  section: Section;
  currentQuestionId: number;
  userAnswers: UserAnswers;
  onAnswerChange: (qId: number, val: string | string[]) => void;
  flaggedQuestions: Set<number>;
  onToggleFlag: (qId: number) => void;
  micEnabled: boolean;
  onSelectQuestion: (id: number) => void;
  highContrast: boolean;
  fontSize: 'standard' | 'large' | 'xlarge';
}

export const ExamView: React.FC<ExamViewProps> = ({
  section,
  currentQuestionId,
  userAnswers,
  onAnswerChange,
  flaggedQuestions,
  onToggleFlag,
  micEnabled,
  onSelectQuestion,
  highContrast,
  fontSize
}) => {
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const el = questionRefs.current[currentQuestionId];
    if (el) {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= 80 && rect.bottom <= window.innerHeight - 80;
      if (!isVisible) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentQuestionId]);

  const startQ = (section.sectionNumber - 1) * 10 + 1;
  const endQ = section.sectionNumber * 10;

  const fontScaleClass =
    fontSize === 'xlarge'
      ? 'text-base'
      : fontSize === 'large'
      ? 'text-[15px]'
      : 'text-sm';

  return (
    <div className={`flex-1 overflow-y-auto ${
      highContrast ? 'bg-black text-yellow-300' : 'bg-[#e2e8f0]'
    } p-3 sm:p-5 font-sans`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Pane: Official Question Booklet / Context Sheet (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`${
            highContrast ? 'bg-black border-yellow-500 text-yellow-300' : 'bg-white border-slate-300 text-slate-900'
          } border p-5 rounded-xs shadow-xs sticky top-0`}>
            {/* Cambridge Official Header */}
            <div className="border-b border-slate-200 pb-3 mb-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-bold tracking-wider uppercase mb-1">
                <span>IELTS Listening Practice</span>
                <span>Part {section.sectionNumber} of 4</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight text-slate-900 leading-snug">
                {section.title}
              </h2>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Questions {startQ} to {endQ}
              </div>
            </div>

            {/* Rubric Instructions */}
            <div className="space-y-3">
              <div>
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-800 mb-1">
                  Scenario Overview
                </h4>
                <p className={`${fontScaleClass} text-slate-700 leading-relaxed`}>
                  {section.description}
                </p>
              </div>

              {/* Section 3 Special Academic Alert */}
              {section.sectionNumber === 3 && (
                <div className="p-3 bg-[#0f172a] text-slate-100 border-l-3 border-[#dc2626] rounded-xs text-xs space-y-1">
                  <div className="font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Part 3 Seminar Discussion Protocol</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    This section features fast-paced academic debate with interruptions and immediate self-corrections. Listen for final speaker agreement before confirming your choices.
                  </p>
                </div>
              )}

              {/* Candidate Direction */}
              <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <Headphones className="w-3.5 h-3.5 text-slate-600" />
                  <span>Auditory Examination Rules:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  • Transcripts remain strictly hidden during test delivery.<br/>
                  • You will hear the audio once only.<br/>
                  • Write or speak your answers into the corresponding question blanks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Question Input Workspace (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-3">
          {section.questions.map((question) => {
            const isCurrent = currentQuestionId === question.id;

            return (
              <div
                key={question.id}
                ref={(el) => { questionRefs.current[question.id] = el; }}
                onClick={() => onSelectQuestion(question.id)}
                className={`transition-all ${
                  isCurrent ? 'ring-2 ring-[#0f172a] shadow-xs' : ''
                }`}
              >
                {question.type === 'multiple_choice' || question.type === 'multiple_choice_multi' ? (
                  <MultipleChoiceQuestion
                    question={question}
                    userAnswer={userAnswers[question.id] || ''}
                    onAnswerChange={onAnswerChange}
                    isFlagged={flaggedQuestions.has(question.id)}
                    onToggleFlag={onToggleFlag}
                  />
                ) : (
                  <GapFillQuestion
                    question={question}
                    userAnswer={String(userAnswers[question.id] || '')}
                    onAnswerChange={onAnswerChange}
                    isFlagged={flaggedQuestions.has(question.id)}
                    onToggleFlag={onToggleFlag}
                    micEnabled={micEnabled}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
