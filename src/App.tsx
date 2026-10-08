import React, { useState, useEffect } from 'react';
import { IELTSTest, UserAnswers, DiagnosticResult } from './types/test';
import { getTestById } from './data/testRepository';
import { ttsEngine, TTSState } from './services/ttsEngine';
import { scoreTest } from './services/scoringEngine';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { ExamView } from './components/ExamView';
import { QuestionPalette } from './components/QuestionPalette';
import { ResultDashboard } from './components/ResultDashboard';
import { TestSelectorModal } from './components/TestSelectorModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { TestHistoryModal } from './components/TestHistoryModal';

export const App: React.FC = () => {
  const [currentTestId, setCurrentTestId] = useState<number>(1);
  const [test, setTest] = useState<IELTSTest>(() => getTestById(1));

  const [activeSectionNum, setActiveSectionNum] = useState<1 | 2 | 3 | 4>(1);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Test mode & controls
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1.0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.95);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'xlarge'>('standard');

  const cycleFontSize = () => {
    setFontSize(prev => prev === 'standard' ? 'large' : prev === 'large' ? 'xlarge' : 'standard');
  };

  // Audio state
  const [ttsState, setTtsState] = useState<TTSState>({
    status: 'idle',
    currentTurnIndex: 0,
    totalTurns: 0,
    currentSpeaker: ''
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Exam completion & results
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Modals
  const [isTestSelectorOpen, setIsTestSelectorOpen] = useState<boolean>(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Load test & hydrate saved answers whenever currentTestId changes
  useEffect(() => {
    ttsEngine.stop();
    setIsPlaying(false);
    const newTest = getTestById(currentTestId);
    setTest(newTest);
    setIsFinished(false);
    setDiagnosticResult(null);

    // Check if user has saved draft answers for this test
    const saved = storageService.loadProgress(currentTestId);
    if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
      setUserAnswers(saved.answers);
      setFlaggedQuestions(new Set(saved.flagged || []));
      setActiveSectionNum(saved.activeSectionNum || 1);
      setCurrentQuestionId(saved.currentQuestionId || 1);
      setLastSavedAt(new Date(saved.lastUpdated));
    } else {
      setUserAnswers({});
      setFlaggedQuestions(new Set());
      setActiveSectionNum(1);
      setCurrentQuestionId(1);
      setLastSavedAt(null);
    }
  }, [currentTestId]);

  // Auto-save answers to localStorage whenever user answers or flags change
  useEffect(() => {
    if (isFinished) return;
    const hasAnswers = Object.keys(userAnswers).length > 0;
    if (hasAnswers || flaggedQuestions.size > 0) {
      storageService.saveProgress(
        currentTestId,
        userAnswers,
        flaggedQuestions,
        undefined,
        activeSectionNum,
        currentQuestionId
      );
      setLastSavedAt(new Date());
    }
  }, [userAnswers, flaggedQuestions, activeSectionNum, currentQuestionId, currentTestId, isFinished]);

  // Audio start / toggle
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (isPracticeMode) {
        ttsEngine.pause();
        setIsPlaying(false);
      }
    } else {
      if (ttsState.status === 'paused') {
        ttsEngine.resume();
        setIsPlaying(true);
      } else {
        const sec = test.sections.find(s => s.sectionNumber === activeSectionNum);
        if (!sec) return;

        setIsPlaying(true);
        ttsEngine.playSection(
          sec.audioScript,
          (state) => {
            setTtsState(state);
            if (state.status === 'playing') setIsPlaying(true);
            else if (state.status === 'paused' || state.status === 'idle') setIsPlaying(false);
          },
          () => {
            setIsPlaying(false);
            setTtsState(prev => ({ ...prev, status: 'idle' }));
          },
          (err) => {
            setIsPlaying(false);
            setTtsState(prev => ({ ...prev, status: 'error', errorMessage: err }));
          }
        );
      }
    }
  };

  const handleRestartAudio = () => {
    ttsEngine.stop();
    setIsPlaying(false);
    const sec = test.sections.find(s => s.sectionNumber === activeSectionNum);
    if (!sec) return;

    setIsPlaying(true);
    ttsEngine.playSection(
      sec.audioScript,
      (state) => {
        setTtsState(state);
        if (state.status === 'playing') setIsPlaying(true);
        else if (state.status === 'paused' || state.status === 'idle') setIsPlaying(false);
      },
      () => {
        setIsPlaying(false);
        setTtsState(prev => ({ ...prev, status: 'idle' }));
      },
      (err) => {
        setIsPlaying(false);
        setTtsState(prev => ({ ...prev, status: 'error', errorMessage: err }));
      }
    );
  };

  const handleSelectSection = (secNum: 1 | 2 | 3 | 4) => {
    if (activeSectionNum === secNum) return;
    ttsEngine.stop();
    setIsPlaying(false);
    setActiveSectionNum(secNum);
    setCurrentQuestionId((secNum - 1) * 10 + 1);
  };

  const handleSelectQuestion = (qId: number) => {
    setCurrentQuestionId(qId);
    const targetSection = Math.ceil(qId / 10) as 1 | 2 | 3 | 4;
    if (targetSection !== activeSectionNum) {
      ttsEngine.stop();
      setIsPlaying(false);
      setActiveSectionNum(targetSection);
    }
  };

  const handleAnswerChange = (qId: number, val: string | string[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const handleToggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleFinishTest = () => {
    ttsEngine.stop();
    setIsPlaying(false);
    const result = scoreTest(test, userAnswers);
    setDiagnosticResult(result);
    setIsFinished(true);

    // Save completed attempt record to persistent history
    storageService.saveAttempt(test.id, test.title, result, userAnswers);
    // Clear draft in-progress answers so next retake starts fresh
    storageService.clearProgress(test.id);
    setLastSavedAt(null);
  };

  const handleRetake = () => {
    ttsEngine.stop();
    setIsPlaying(false);
    // Explicitly wipe saved draft from storage
    storageService.clearProgress(test.id);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setActiveSectionNum(1);
    setCurrentQuestionId(1);
    setIsFinished(false);
    setDiagnosticResult(null);
    setLastSavedAt(null);
  };

  const activeSection = test.sections.find(s => s.sectionNumber === activeSectionNum) || test.sections[0];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 select-none">
      {/* Top Header */}
      <Header
        currentTest={test}
        onOpenTestSelector={() => setIsTestSelectorOpen(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onRetake={handleRetake}
        isPracticeMode={isPracticeMode}
        onTogglePracticeMode={() => setIsPracticeMode(prev => !prev)}
        micEnabled={micEnabled}
        onToggleMic={() => setMicEnabled(prev => !prev)}
        onTimeExpired={handleFinishTest}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(prev => !prev)}
        fontSize={fontSize}
        onCycleFontSize={cycleFontSize}
        lastSavedAt={lastSavedAt}
      />

      {/* Persistent Audio Controller Bar (Active during exam) */}
      {!isFinished && (
        <AudioPlayerBar
          ttsState={ttsState}
          isPlaying={isPlaying}
          isPracticeMode={isPracticeMode}
          volume={volume}
          onVolumeChange={(v) => {
            setVolume(v);
            ttsEngine.setVolume(v);
          }}
          playbackSpeed={playbackSpeed}
          onSpeedChange={(speed) => {
            setPlaybackSpeed(speed);
            ttsEngine.setPlaybackSpeed(speed);
          }}
          onTogglePlay={handleTogglePlay}
          onRestartAudio={handleRestartAudio}
          activeSectionNum={activeSectionNum}
          highContrast={highContrast}
        />
      )}

      {/* Main Viewport */}
      {isFinished && diagnosticResult ? (
        <ResultDashboard
          test={test}
          result={diagnosticResult}
          onRetake={handleRetake}
          onSelectAnotherTest={() => setIsTestSelectorOpen(true)}
        />
      ) : (
        <>
          <ExamView
            section={activeSection}
            currentQuestionId={currentQuestionId}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            micEnabled={micEnabled}
            onSelectQuestion={handleSelectQuestion}
            highContrast={highContrast}
            fontSize={fontSize}
          />

          <QuestionPalette
            currentQuestionId={currentQuestionId}
            onSelectQuestion={handleSelectQuestion}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            onFinishTest={handleFinishTest}
            activeSectionNum={activeSectionNum}
            onSelectSection={handleSelectSection}
            highContrast={highContrast}
          />
        </>
      )}

      {/* 100 Tests Selector Modal */}
      <TestSelectorModal
        isOpen={isTestSelectorOpen}
        onClose={() => setIsTestSelectorOpen(false)}
        currentTestId={currentTestId}
        onSelectTest={(id) => setCurrentTestId(id)}
      />

      {/* Audio Engine Diagnostic Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

      {/* Historical Test Attempts & Band Score Modal */}
      <TestHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectTestToRetake={(id) => {
          setCurrentTestId(id);
          setIsHistoryOpen(false);
        }}
        highContrast={highContrast}
      />
    </div>
  );
};
