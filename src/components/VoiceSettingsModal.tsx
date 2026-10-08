import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, Play } from 'lucide-react';
import { ttsEngine } from '../services/ttsEngine';
import { micService } from '../services/speechRecognition';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [testSpeechStatus, setTestSpeechStatus] = useState<string | null>(null);
  const [micTestResult, setMicTestResult] = useState<string | null>(null);
  const [isTestingMic, setIsTestingMic] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const v = ttsEngine.getAvailableVoices();
      setVoices(v);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestAudio = () => {
    setTestSpeechStatus('Executing speech audio test...');
    const sampleTurns = [
      {
        speaker: 'Lead Examiner',
        speakerRole: 'speaker1' as const,
        accent: 'en-GB' as const,
        text: 'This is an official audio check for the Cambridge IELTS Listening Simulator. Voices are calibrated for British, Australian, and international accents.'
      }
    ];

    ttsEngine.playSection(
      sampleTurns,
      () => {},
      () => setTestSpeechStatus('Speech synthesis operational.'),
      (err) => setTestSpeechStatus(`Audio diagnostic error: ${err}`)
    );
  };

  const handleTestMic = () => {
    setIsTestingMic(true);
    setMicTestResult('Listening... Dictate a sample IELTS answer (e.g., "30 April" or "waterproof boots")');

    micService.startListening(
      (text) => {
        setMicTestResult(`Parsed text: "${text}"`);
        setIsTestingMic(false);
      },
      (err) => {
        setMicTestResult(`Microphone error: ${err}`);
        setIsTestingMic(false);
      },
      () => {
        setIsTestingMic(false);
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xs w-full max-w-lg border border-slate-400 shadow-xl overflow-hidden text-xs">
        {/* Header */}
        <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-300" />
            <h3 className="font-mono font-bold text-sm tracking-tight">
              AUDIO & HARDWARE DIAGNOSTICS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 bg-[#f8fafc]">
          {/* TTS Voices */}
          <div className="bg-white p-3.5 border border-slate-300 rounded-xs">
            <h4 className="font-mono font-bold text-slate-900 uppercase tracking-wider mb-1">
              Text-to-Speech Engine
            </h4>
            <p className="text-slate-600 mb-2">
              Automatically assigns distinct pitch, tempo, and vocal characteristics across conversational roles.
            </p>

            <div className="bg-slate-50 p-2.5 border border-slate-200 font-mono text-[11px] mb-3">
              <span className="font-bold text-slate-800">
                Detected English System Voices: {voices.length}
              </span>
              <div className="mt-1 max-h-24 overflow-y-auto space-y-0.5 text-slate-600">
                {voices.slice(0, 5).map((v, i) => (
                  <div key={i} className="truncate">
                    • {v.name} [{v.lang}]
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleTestAudio}
              className="px-3 py-1.5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xs font-mono font-bold transition flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>TEST AUDIO STREAM</span>
            </button>

            {testSpeechStatus && (
              <p className="mt-2 font-mono text-slate-800 font-semibold">
                {testSpeechStatus}
              </p>
            )}
          </div>

          {/* Microphone */}
          <div className="bg-white p-3.5 border border-slate-300 rounded-xs">
            <h4 className="font-mono font-bold text-slate-900 uppercase tracking-wider mb-1">
              Microphone Speech Recognition
            </h4>
            <p className="text-slate-600 mb-2">
              Verifies browser speech recognition and auto-formatting into Cambridge written conventions.
            </p>

            <button
              onClick={handleTestMic}
              disabled={isTestingMic}
              className={`px-3 py-1.5 rounded-xs font-mono font-bold transition flex items-center gap-1.5 ${
                isTestingMic
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{isTestingMic ? 'LISTENING...' : 'TEST MICROPHONE'}</span>
            </button>

            {micTestResult && (
              <p className="mt-2 font-mono text-slate-800 bg-slate-50 p-2 border border-slate-200">
                {micTestResult}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-[#0f172a] text-white font-mono font-bold rounded-xs hover:bg-slate-800"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
