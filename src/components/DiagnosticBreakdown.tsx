import React, { useState } from 'react';
import {
  Check,
  X,
  FileText,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';
import { QuestionAnalysis, DifficultyFactors } from '../types/test';

interface DiagnosticBreakdownProps {
  questionsAnalysis: QuestionAnalysis[];
}

export const DiagnosticBreakdown: React.FC<DiagnosticBreakdownProps> = ({
  questionsAnalysis
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'section3'>('incorrect');
  const [expandedQId, setExpandedQId] = useState<number | null>(null);

  const filteredList = questionsAnalysis.filter((qa) => {
    if (filter === 'incorrect') return !qa.isCorrect;
    if (filter === 'section3') return qa.sectionId === 3;
    return true;
  });

  const toggleExpand = (qId: number) => {
    setExpandedQId(prev => (prev === qId ? null : qId));
  };

  const renderFactorRow = (label: string, val: number) => {
    return (
      <div key={label} className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
        <span className="text-slate-600 font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-slate-200 rounded-xs overflow-hidden">
            <div
              className={`h-full ${val >= 8 ? 'bg-red-600' : val >= 6 ? 'bg-slate-700' : 'bg-slate-400'}`}
              style={{ width: `${val * 10}%` }}
            />
          </div>
          <span className="font-mono text-[11px] font-bold text-slate-800 w-8 text-right">{val}/10</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Control Strip */}
      <div className="bg-white p-4 border border-slate-300 rounded-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-base text-slate-900 font-mono tracking-tight flex items-center gap-2">
            <Target className="w-4 h-4 text-slate-900" />
            <span>ERROR ANALYSIS & CAMBRIDGE DISTRACTOR AUDIT</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed breakdown of linguistic distractors, acoustic traps, and 11-factor cognitive load profiles.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center border border-slate-300 bg-slate-100 rounded-xs overflow-hidden text-xs font-mono font-bold">
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1.5 transition ${
              filter === 'incorrect' ? 'bg-[#0f172a] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mistakes ({questionsAnalysis.filter(q => !q.isCorrect).length})
          </button>
          <button
            onClick={() => setFilter('section3')}
            className={`px-3 py-1.5 transition ${
              filter === 'section3' ? 'bg-[#0f172a] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Part 3 Debate (10)
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 transition ${
              filter === 'all' ? 'bg-[#0f172a] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 40 Questions
          </button>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="bg-white p-8 border border-slate-300 rounded-xs text-center">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center justify-center mx-auto mb-2">
            <Check className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900">Zero Mistakes in this Filter</h4>
          <p className="text-xs text-slate-500 mt-1">All responses in this category met official Cambridge grading criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((qa) => {
            const isExpanded = expandedQId === qa.questionId;
            const profile = qa.difficultyProfile;

            return (
              <div
                key={qa.questionId}
                className="bg-white border border-slate-300 rounded-xs overflow-hidden"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(qa.questionId)}
                  className={`p-3.5 cursor-pointer flex flex-wrap items-center justify-between gap-3 transition ${
                    qa.isCorrect ? 'hover:bg-slate-50' : 'bg-red-50/20 hover:bg-red-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-xs font-mono font-bold text-xs flex items-center justify-center ${
                      qa.isCorrect ? 'bg-emerald-700 text-white' : 'bg-[#dc2626] text-white'
                    }`}>
                      {qa.isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          QUESTION {qa.questionId}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          [Part {qa.sectionId}]
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                          {profile.level.toUpperCase()} • {profile.difficulty}/10
                        </span>
                      </div>

                      <div className="text-xs mt-1.5 font-sans text-slate-800 font-medium">
                        {qa.prompt}
                        {(qa.contextBefore || qa.contextAfter) && (
                          <span className="block mt-0.5 text-[11px] font-mono text-slate-500">
                            Blank context: <span className="bg-slate-100 px-1 py-0.5 rounded-xs border border-slate-200 text-slate-700">{qa.contextBefore || ''}<u>[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</u>{qa.contextAfter || ''}</span>
                          </span>
                        )}
                      </div>

                      <div className="text-xs mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 font-mono">
                        <span className="text-slate-600">
                          Candidate: <strong className={qa.isCorrect ? 'text-emerald-800' : 'text-red-700'}>
                            {qa.userAnswer || '(No response)'}
                          </strong>
                        </span>
                        <span className="text-slate-600">
                          Key: <strong className="text-slate-900">
                            {qa.acceptedAnswers.join(' / ')}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-500">
                    <span>{isExpanded ? 'Collapse' : 'Audit Details'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Deep Audit Details */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-200 bg-[#f8fafc] space-y-3.5 text-xs">
                    {/* The Distractor Trap */}
                    {qa.distractorTrap && (
                      <div className="bg-white border border-red-200 p-3 rounded-xs">
                        <div className="font-mono font-bold text-[11px] text-red-800 uppercase tracking-wider mb-1">
                          Cambridge Distractor Trap {qa.distractorHit ? `("${qa.distractorHit}")` : ''}
                        </div>
                        <p className="text-slate-800 leading-relaxed font-sans">
                          {qa.distractorTrap}
                        </p>
                      </div>
                    )}

                    {/* Audio Evidence Quote */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xs">
                      <div className="font-mono font-bold text-[11px] text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Verbatim Audio Transcript Evidence</span>
                      </div>
                      <blockquote className="italic font-sans text-slate-900 pl-2.5 border-l-2 border-slate-400 py-0.5">
                        "{qa.evidenceQuote}"
                      </blockquote>
                    </div>

                    {/* Cambridge Mastery Technique */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xs">
                      <div className="font-mono font-bold text-[11px] text-slate-800 uppercase tracking-wider mb-1">
                        Cambridge Listening Technique
                      </div>
                      <p className="text-slate-800 leading-relaxed font-sans font-medium">
                        {qa.listeningTechnique}
                      </p>
                    </div>

                    {/* Hardness Engine 11-Factor Breakdown */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xs">
                      <div className="font-mono font-bold text-[11px] text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1 flex justify-between">
                        <span>Cognitive Load Profile (11 Factors)</span>
                        <span>Aggregate: {profile.difficulty}/10</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0.5">
                        {renderFactorRow('Paraphrase Distance', profile.factors.paraphrase_distance)}
                        {renderFactorRow('Distractor Density', profile.factors.distractor_density)}
                        {renderFactorRow('Correction Frequency', profile.factors.correction_frequency)}
                        {renderFactorRow('Information Density', profile.factors.information_density)}
                        {renderFactorRow('Speaker Switching', profile.factors.speaker_switching)}
                        {renderFactorRow('Prediction Subversion', profile.factors.answer_prediction_difficulty)}
                        {renderFactorRow('Lexical Complexity', profile.factors.lexical_complexity)}
                        {renderFactorRow('Syntactic Complexity', profile.factors.syntactic_complexity)}
                        {renderFactorRow('Speech Rate (WPM)', profile.factors.speech_rate)}
                        {renderFactorRow('Numerical Density', profile.factors.numerical_density)}
                        {renderFactorRow('Accent Variation', profile.factors.accent_variation)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
