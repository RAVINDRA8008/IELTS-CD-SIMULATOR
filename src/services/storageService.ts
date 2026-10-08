import { UserAnswers, DiagnosticResult } from '../types/test';

export interface TestAttemptRecord {
  id: string;
  testId: number;
  testTitle: string;
  completedAt: string;
  rawScore: number;
  bandScore: number;
  percentage: number;
  sectionScores: Record<number, { correct: number; total: number }>;
  userAnswers: UserAnswers;
}

export interface SavedTestState {
  testId: number;
  answers: UserAnswers;
  flagged: number[];
  secondsRemaining?: number;
  activeSectionNum?: 1 | 2 | 3 | 4;
  currentQuestionId?: number;
  lastUpdated: string;
}

const STORAGE_KEYS = {
  CURRENT_STATE: (testId: number) => `ielts_listening_state_test_${testId}`,
  ATTEMPTS_HISTORY: 'ielts_listening_attempts_history',
  ACTIVE_TEST_ID: 'ielts_listening_active_test_id',
};

export const storageService = {
  // Save current in-progress test answers and state
  saveProgress: (
    testId: number,
    answers: UserAnswers,
    flagged: Set<number>,
    secondsRemaining?: number,
    activeSectionNum?: 1 | 2 | 3 | 4,
    currentQuestionId?: number
  ) => {
    try {
      const state: SavedTestState = {
        testId,
        answers,
        flagged: Array.from(flagged),
        secondsRemaining,
        activeSectionNum,
        currentQuestionId,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_STATE(testId), JSON.stringify(state));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TEST_ID, String(testId));
    } catch (e) {
      console.warn('Failed to save test state to localStorage:', e);
    }
  },

  // Load in-progress answers for a specific test
  loadProgress: (testId: number): SavedTestState | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_STATE(testId));
      if (!data) return null;
      return JSON.parse(data) as SavedTestState;
    } catch (e) {
      console.warn('Failed to load test state from localStorage:', e);
      return null;
    }
  },

  // Clear in-progress answers for retaking
  clearProgress: (testId: number) => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_STATE(testId));
    } catch (e) {
      console.warn('Failed to clear test state:', e);
    }
  },

  // Get active test ID
  getActiveTestId: (): number => {
    try {
      const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_TEST_ID);
      return id ? parseInt(id, 10) : 1;
    } catch {
      return 1;
    }
  },

  // Save a completed exam attempt
  saveAttempt: (
    testId: number,
    testTitle: string,
    result: DiagnosticResult,
    userAnswers: UserAnswers
  ): TestAttemptRecord => {
    try {
      const record: TestAttemptRecord = {
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        testId,
        testTitle,
        completedAt: new Date().toISOString(),
        rawScore: result.rawScore,
        bandScore: result.bandScore,
        percentage: result.percentage,
        sectionScores: result.sectionScores,
        userAnswers
      };

      const history = storageService.getAttempts();
      const updated = [record, ...history.slice(0, 49)]; // keep latest 50 attempts
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS_HISTORY, JSON.stringify(updated));

      return record;
    } catch (e) {
      console.warn('Failed to save attempt record:', e);
      return {
        id: String(Date.now()),
        testId,
        testTitle,
        completedAt: new Date().toISOString(),
        rawScore: result.rawScore,
        bandScore: result.bandScore,
        percentage: result.percentage,
        sectionScores: result.sectionScores,
        userAnswers
      };
    }
  },

  // Retrieve past attempts
  getAttempts: (): TestAttemptRecord[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS_HISTORY);
      if (!data) return [];
      return JSON.parse(data) as TestAttemptRecord[];
    } catch (e) {
      console.warn('Failed to read attempts history:', e);
      return [];
    }
  },

  // Clear all past attempts
  clearHistory: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ATTEMPTS_HISTORY);
    } catch (e) {
      console.warn('Failed to clear history:', e);
    }
  }
};
