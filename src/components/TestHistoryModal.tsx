import React, { useState } from 'react';
import { X, Award, Clock, RotateCcw, Trash2, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { storageService, TestAttemptRecord } from '../services/storageService';

interface TestHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTestToRetake: (testId: number) => void;
  highContrast?: boolean;
}

export const TestHistoryModal: React.FC<TestHistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectTestToRetake,
  highContrast
}) => {
  const [history, setHistory] = useState<TestAttemptRecord[]>(() => storageService.getAttempts());
  const [selectedRecord, setSelectedRecord] = useState<TestAttemptRecord | null>(null);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire IELTS test attempt history?")) {
      storageService.clearHistory();
      setHistory([]);
      setSelectedRecord(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  const getBandBadgeClass = (band: number) => {
    if (band >= 8.5) return 'bg-emerald-950 text-emerald-300 border-emerald-600';
    if (band >= 7.5) return 'bg-blue-950 text-blue-300 border-blue-600';
    if (band >= 6.5) return 'bg-amber-950 text-amber-300 border-amber-600';
    return 'bg-red-950 text-red-300 border-red-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xs border shadow-2xl ${
        highContrast
          ? 'bg-black text-yellow-300 border-yellow-500'
          : 'bg-[#0f172a] text-slate-100 border-slate-700'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-950 border border-rose-800 rounded-xs text-rose-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-base text-white flex items-center gap-2">
                Candidate Attempt History
                <span className="text-xs px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xs">
                  {history.length} {history.length === 1 ? 'Attempt' : 'Attempts'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Historical scores, band conversions, and answer records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-2.5 py-1 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900 rounded-xs transition flex items-center gap-1"
                title="Clear all saved test history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear History</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xs border border-transparent hover:border-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <BarChart3 className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
              <div className="text-slate-400 font-mono text-sm font-bold">
                No Completed Test Attempts Yet
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                When you complete an official listening test and submit for scoring, your detailed band score and answers will be saved here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 bg-slate-900/90 border border-slate-800 hover:border-slate-600 rounded-xs transition flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Band Score Pill */}
                    <div className={`px-3 py-1.5 rounded-xs border font-mono font-black text-lg ${getBandBadgeClass(rec.bandScore)}`}>
                      Band {rec.bandScore.toFixed(1)}
                    </div>

                    <div>
                      <div className="font-bold text-sm text-white font-mono flex items-center gap-2">
                        <span>Test #{rec.testId}</span>
                        <span className="text-xs text-slate-400 font-normal truncate max-w-xs sm:max-w-md">
                          {rec.testTitle.replace(/^Test \d+:\s*/, '')}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {formatDate(rec.completedAt)}
                        </span>
                        <span>•</span>
                        <span>Raw Score: <strong className="text-slate-200">{rec.rawScore}/40</strong> ({rec.percentage}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectTestToRetake(rec.testId);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold rounded-xs border border-slate-700 transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                      <span>Retake Test</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Results stored locally in your browser offline.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xs border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
