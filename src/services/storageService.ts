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

export interface FinishedTestState {
  testId: number;
  testTitle: string;
  result: DiagnosticResult;
  userAnswers: UserAnswers;
  completedAt: string;
}

const STORAGE_KEYS = {
  CURRENT_STATE: (testId: number) => `ielts_listening_state_test_${testId}`,
  FINISHED_STATE: (testId: number) => `ielts_listening_finished_test_${testId}`,
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

  // Save finished test state with score and answers
  saveFinishedTest: (
    testId: number,
    testTitle: string,
    result: DiagnosticResult,
    userAnswers: UserAnswers
  ) => {
    try {
      const state: FinishedTestState = {
        testId,
        testTitle,
        result,
        userAnswers,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.FINISHED_STATE(testId), JSON.stringify(state));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TEST_ID, String(testId));
    } catch (e) {
      console.warn('Failed to save finished test state:', e);
    }
  },

  // Load finished test state if completed
  loadFinishedTest: (testId: number): FinishedTestState | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FINISHED_STATE(testId));
      if (!data) return null;
      return JSON.parse(data) as FinishedTestState;
    } catch (e) {
      console.warn('Failed to load finished test state:', e);
      return null;
    }
  },

  // Clear in-progress answers only (when test is finished or retaken)
  clearProgressOnly: (testId: number) => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_STATE(testId));
    } catch (e) {
      console.warn('Failed to clear test progress:', e);
    }
  },

  // Clear both in-progress and finished state for retaking
  clearProgress: (testId: number) => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_STATE(testId));
      localStorage.removeItem(STORAGE_KEYS.FINISHED_STATE(testId));
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

  // Set active test ID
  setActiveTestId: (testId: number) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TEST_ID, String(testId));
    } catch (e) {
      console.warn('Failed to set active test ID:', e);
    }
  },

  // Save a completed exam attempt to history list
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
      const updated = [record, ...history.slice(0, 99)]; // keep latest 100 attempts
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
