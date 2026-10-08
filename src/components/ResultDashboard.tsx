import React, { useState } from 'react';
import {
  RotateCcw,
  Layers,
  Headphones,
  Play,
  Pause,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { DiagnosticResult, IELTSTest, Section } from '../types/test';
import { DiagnosticBreakdown } from './DiagnosticBreakdown';
import { ttsEngine, TTSState } from '../services/ttsEngine';

interface ResultDashboardProps {
  test: IELTSTest;
  result: DiagnosticResult;
  onRetake: () => void;
  onSelectAnotherTest: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  test,
  result,
  onRetake,
  onSelectAnotherTest
}) => {
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'transcript'>('diagnostic');
  const [activeTranscriptSection, setActiveTranscriptSection] = useState<number>(3);
  const [replayState, setReplayState] = useState<TTSState>({
    status: 'idle',
    currentTurnIndex: 0,
    totalTurns: 0,
    currentSpeaker: ''
  });

  const getBandDescriptor = (band: number): string => {
    if (band >= 9.0) return 'Expert User (C2 Mastery)';
    if (band >= 8.5) return 'Very Good User (Near Native / C2)';
    if (band >= 7.5) return 'Very Good User (C1 Advanced)';
    if (band >= 6.5) return 'Competent User (B2 Upper-Intermediate)';
    if (band >= 5.5) return 'Modest User (B1 Intermediate)';
    return 'Limited User (Developing)';
  };

  const handlePlayTranscriptSection = (sec: Section) => {
    if (replayState.status === 'playing') {
      ttsEngine.stop();
      setReplayState(prev => ({ ...prev, status: 'idle' }));
      return;
    }

    ttsEngine.playSection(
      sec.audioScript,
      (state) => setReplayState(state),
      () => setReplayState(prev => ({ ...prev, status: 'idle' })),
      (err) => console.warn(err)
    );
  };

  const currentSecObj = test.sections.find(s => s.sectionNumber === activeTranscriptSection) || test.sections[2];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Official Test Report Form (TRF) Header */}
        <div className="bg-white border border-slate-300 rounded-xs p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#dc2626] text-white font-mono font-bold text-xs px-2 py-0.5 rounded-xs">
                  IELTS TEST REPORT
                </span>
                <span className="font-mono text-xs text-slate-500">
                  Form Ref: TRF-CDL-{test.id.toString().padStart(3, '0')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Listening Assessment Diagnostic
              </h2>
              <div className="text-xs text-slate-600 font-mono mt-0.5">
                {test.title}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onRetake}
                className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xs text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>

              <button
                onClick={onSelectAnotherTest}
                className="px-4 py-1.5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xs text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>100 Tests Bank</span>
              </button>
            </div>
          </div>

          {/* Core Institutional Scores Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {/* Band Score Card */}
            <div className="bg-[#0f172a] text-white p-4 rounded-xs border border-slate-800">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                OVERALL BAND SCORE
              </div>
              <div className="text-4xl font-mono font-black tracking-tight">
                {result.bandScore.toFixed(1)}
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">
                {getBandDescriptor(result.bandScore)}
              </div>
            </div>

            {/* Raw Score */}
            <div className="bg-[#f8fafc] border border-slate-300 p-4 rounded-xs">
              <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                RAW SCORE
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900">
                {result.rawScore} <span className="text-base text-slate-400 font-normal">/ 40</span>
              </div>
              <div className="text-xs font-mono text-slate-600 mt-1">
                Accuracy: {result.percentage}%
              </div>
            </div>

            {/* Section 3 Score */}
            <div className="bg-[#f8fafc] border border-slate-300 p-4 rounded-xs">
              <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                PART 3 DEBATE ACCURACY
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900">
                {result.sectionScores[2]?.correct || 0} <span className="text-base text-slate-400 font-normal">/ 10</span>
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Academic Discussion Module
              </div>
            </div>

            {/* Overall Hardness */}
            <div className="bg-[#f8fafc] border border-slate-300 p-4 rounded-xs">
              <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                TEST HARDNESS
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900">
                {test.overallDifficulty} <span className="text-base text-slate-400 font-normal">/ 10</span>
              </div>
              <div className="text-xs font-mono text-slate-600 mt-1">
                {test.difficultyBandTarget}
              </div>
            </div>
          </div>

          {/* Section Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-200 text-xs font-mono">
            {result.sectionScores.map((s) => (
              <div key={s.sectionNumber} className="bg-slate-50 p-2 border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Part {s.sectionNumber}</span>
                  <span>{s.correct}/10</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Avg Diff: {s.avgDifficulty}/10
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 Targeted Guidance Advisory */}
        <div className="bg-white border-l-4 border-[#dc2626] border-y border-r border-slate-300 p-4 rounded-xs text-xs">
          <div className="font-mono font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Part 3 Academic Discussion Strategy Advisory</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-sans">
            In Cambridge academic seminars, initial claims are regularly disputed or retracted. Candidates who commit to early numbers often fall victim to the <strong>"Hypothesis Inversion Trap"</strong>. Always verify whether a subsequent student or tutor introduced a qualifying condition (e.g. <em>"Actually, when sensor calibration was adjusted..."</em>) before finalizing your choice.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center border border-slate-300 bg-white p-1 rounded-xs gap-1 font-mono text-xs font-bold">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`flex-1 py-2 text-center transition rounded-xs ${
              activeTab === 'diagnostic' ? 'bg-[#0f172a] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            "Why You Missed It" Diagnostic (40 Questions)
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`flex-1 py-2 text-center transition rounded-xs ${
              activeTab === 'transcript' ? 'bg-[#0f172a] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Audio Replay & Interactive Tape Script
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'diagnostic' && (
          <DiagnosticBreakdown questionsAnalysis={result.questionsAnalysis} />
        )}

        {activeTab === 'transcript' && (
          <div className="bg-white border border-slate-300 rounded-xs p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-sm font-mono text-slate-900 uppercase tracking-wide">
                  Tape Script & Dialogue Replay
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Audio recordings are now unlocked with synchronized line tracking and highlighted question keys.
                </p>
              </div>

              {/* Part selector */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-slate-300 bg-slate-100 rounded-xs overflow-hidden text-xs font-mono font-bold">
                  {([1, 2, 3, 4] as const).map(sNum => (
                    <button
                      key={sNum}
                      onClick={() => {
                        ttsEngine.stop();
                        setActiveTranscriptSection(sNum);
                        setReplayState(prev => ({ ...prev, status: 'idle' }));
                      }}
                      className={`px-3 py-1 transition ${
                        activeTranscriptSection === sNum
                          ? 'bg-[#0f172a] text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Part {sNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePlayTranscriptSection(currentSecObj)}
                  className="px-3 py-1 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xs text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  {replayState.status === 'playing' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Replay Part {activeTranscriptSection}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Audio Script Lines */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {currentSecObj.audioScript.map((turn, idx) => {
                const isCurrentlySpoken = replayState.status === 'playing' && replayState.currentTurnIndex === idx + 1;
                const matchedQuestions = currentSecObj.questions.filter(q =>
                  turn.text.toLowerCase().includes(q.evidenceQuote.toLowerCase().slice(0, 30))
                );

                return (
                  <div
                    key={idx}
                    className={`p-3 border rounded-xs text-xs transition-all ${
                      isCurrentlySpoken
                        ? 'border-[#0f172a] bg-slate-100'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">
                          {turn.speaker}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          [{turn.accent || 'en-GB'}]
                        </span>
                        {turn.isInterruption && (
                          <span className="font-mono text-[10px] text-red-600 uppercase font-bold">
                            (Interruption)
                          </span>
                        )}
                      </div>

                      {matchedQuestions.length > 0 && (
                        <div className="flex items-center gap-1">
                          {matchedQuestions.map(mq => (
                            <span
                              key={mq.id}
                              className="font-mono text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded-xs font-bold"
                            >
                              Evidence: Q{mq.id}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-slate-800 leading-relaxed font-sans">
                      {turn.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
