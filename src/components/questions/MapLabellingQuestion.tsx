import React from 'react';
import { Flag, Compass, MapPin } from 'lucide-react';
import { Question } from '../../types/test';

interface MapLabellingQuestionProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (qId: number, val: string) => void;
  isFlagged: boolean;
  onToggleFlag: (qId: number) => void;
}

export const MapLabellingQuestion: React.FC<MapLabellingQuestionProps> = ({
  question,
  userAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag
}) => {
  const selectedLetter = (userAnswer || '').trim().toUpperCase();
  const mapData = question.mapData;

  const defaultLocations = [
    { letter: 'A', name: 'North Pavilion', x: 28, y: 22 },
    { letter: 'B', name: 'Eastern Pier', x: 74, y: 28 },
    { letter: 'C', name: 'Central Atrium', x: 50, y: 48 },
    { letter: 'D', name: 'West Garden', x: 22, y: 65 },
    { letter: 'E', name: 'Courtyard Café', x: 42, y: 72 },
    { letter: 'F', name: 'South Gatehouse', x: 70, y: 76 },
    { letter: 'G', name: 'Information Point', x: 50, y: 88 }
  ];

  const locations = mapData?.locations && mapData.locations.length > 0
    ? mapData.locations
    : defaultLocations;

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
      {/* Header */}
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
          <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-xs border border-blue-200">
            MAP / PLAN LABELLING
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

      {/* Question Prompt */}
      <div className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-rose-600" />
        <span>{question.prompt}</span>
      </div>

      {/* Vector Layout / Plan Container */}
      <div className="relative w-full max-w-xl mx-auto mb-4 bg-slate-900 rounded-sm overflow-hidden border border-slate-700 p-2 shadow-inner">
        {/* Map Header */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pb-2 border-b border-slate-800 px-2">
          <span className="font-bold text-white tracking-wide uppercase">
            {mapData?.title || "Facility Layout & Site Plan"}
          </span>
          <div className="flex items-center gap-1 text-slate-400">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-bold">N ↑</span>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="relative w-full aspect-16/10 bg-[#0a101d] rounded-xs overflow-hidden mt-1 select-none">
          {/* Subtle Grid and Pathways */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6" />

            {/* Walking Path network */}
            <path d="M 10 180 Q 200 140 250 100 T 500 80" fill="none" stroke="#334155" strokeWidth="6" strokeDasharray="4 4" />
            <path d="M 250 100 L 250 250" fill="none" stroke="#334155" strokeWidth="6" strokeDasharray="4 4" />
            <path d="M 120 220 L 400 220" fill="none" stroke="#334155" strokeWidth="5" strokeDasharray="4 4" />

            {/* Main Entrance Marker */}
            <rect x="220" y="270" width="80" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="260" y="284" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold">
              MAIN ENTRANCE
            </text>

            {/* Landmark Pond / Courtyard */}
            <circle cx="260" cy="115" r="32" fill="#0c4a6e" stroke="#0284c7" strokeWidth="1" opacity="0.4" />
            <text x="260" y="119" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
              Water Feature
            </text>
          </svg>

          {/* Interactive Letter Markers placed at percentage coordinates */}
          {locations.map((loc) => {
            const isSelected = selectedLetter === loc.letter;
            return (
              <button
                key={loc.letter}
                type="button"
                onClick={() => handleSelect(loc.letter)}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono font-black text-xs flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isSelected
                    ? 'bg-rose-500 text-white ring-4 ring-rose-400/50 scale-110 z-20 animate-bounce'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white border-2 border-slate-400 hover:scale-105 z-10'
                }`}
                title={`Select location ${loc.letter}${loc.name ? ` (${loc.name})` : ''}`}
              >
                {loc.letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selection Control: Clickable letter pills */}
      <div className="bg-[#f8fafc] border border-slate-200 rounded-xs p-3">
        <div className="text-xs font-mono font-bold text-slate-700 mb-2">
          Select the letter (A–{locations[locations.length - 1]?.letter || 'G'}) matching this location:
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {locations.map((loc) => {
            const isSelected = selectedLetter === loc.letter;
            return (
              <button
                key={loc.letter}
                type="button"
                onClick={() => handleSelect(loc.letter)}
                className={`px-3 py-1.5 rounded-xs font-mono text-xs font-bold border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {loc.letter}
                </span>
                <span>Location {loc.letter}</span>
              </button>
            );
          })}
        </div>

        {selectedLetter && (
          <div className="mt-2 text-xs font-mono text-emerald-700 font-bold flex items-center gap-1.5">
            <span>✓ Current Answer:</span>
            <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 rounded-xs">
              Location {selectedLetter}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
