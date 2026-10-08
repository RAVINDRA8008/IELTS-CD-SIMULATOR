import React, { useState } from 'react';
import { X, Search, Layers, ChevronRight } from 'lucide-react';
import { getAllTestSummaries } from '../data/testRepository';

interface TestSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTestId: number;
  onSelectTest: (testId: number) => void;
}

export const TestSelectorModal: React.FC<TestSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTestId,
  onSelectTest
}) => {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'brutal' | 'hard'>('all');

  if (!isOpen) return null;

  const allSummaries = getAllTestSummaries();

  const filteredTests = allSummaries.filter((t) => {
    const matchesSearch =
      t.id.toString().includes(search) ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.sectionTopics.some(topic => topic.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterMode === 'brutal') return t.overallDifficulty >= 8.0;
    if (filterMode === 'hard') return t.overallDifficulty < 8.0;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xs w-full max-w-4xl max-h-[85vh] flex flex-col border border-slate-400 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between shrink-0 border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#dc2626] text-white font-mono font-bold text-xs px-2 py-0.5 rounded-xs">
                IELTS ARCHIVE
              </span>
              <h2 className="text-base font-bold font-mono tracking-tight text-white">
                100 Listening Examination Test Bank
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              400 Sections • 4,000 Questions • Calibrated Cambridge Difficulty Profiles
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Strip */}
        <div className="p-3 bg-[#f8fafc] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by test number (1-100) or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xs text-xs font-mono focus:outline-none focus:border-slate-800"
            />
          </div>

          <div className="flex items-center border border-slate-300 bg-white rounded-xs overflow-hidden text-xs font-mono font-bold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 transition ${
                filterMode === 'all' ? 'bg-[#0f172a] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 100 Tests
            </button>
            <button
              onClick={() => setFilterMode('brutal')}
              className={`px-3 py-1 transition ${
                filterMode === 'brutal' ? 'bg-[#dc2626] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brutal (8.0+)
            </button>
            <button
              onClick={() => setFilterMode('hard')}
              className={`px-3 py-1 transition ${
                filterMode === 'hard' ? 'bg-slate-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hard (7.0–7.9)
            </button>
          </div>
        </div>

        {/* Test List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#f1f5f9]">
          {filteredTests.length === 0 ? (
            <div className="text-center py-10 font-mono text-xs text-slate-500">
              No examination records found matching criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredTests.map((t) => {
                const isSelected = t.id === currentTestId;

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTest(t.id);
                      onClose();
                    }}
                    className={`p-3.5 bg-white border cursor-pointer transition text-left ${
                      isSelected
                        ? 'border-[#0f172a] ring-1 ring-[#0f172a]'
                        : 'border-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-[#0f172a] text-white px-2 py-0.5 rounded-xs">
                          TEST #{t.id}
                        </span>
                        {isSelected && (
                          <span className="font-mono text-[10px] font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5">
                            CURRENT
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-[11px] font-bold text-slate-700">
                        DIFF {t.overallDifficulty}/10
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                      {t.title}
                    </h4>

                    <div className="mt-2 text-[10px] font-mono text-slate-500 line-clamp-1">
                      {t.sectionTopics.slice(0, 2).map(s => s.replace(/^Section \d+:\s*/, '')).join(' • ')}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-900">
                      <span>LOAD TEST #{t.id}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
