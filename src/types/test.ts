export interface DifficultyFactors {
  speech_rate: number;                // 1-10: Tempo and micro-pauses (authentic 140-180 wpm)
  information_density: number;        // 1-10: Volume of relevant vs competing details
  lexical_complexity: number;         // 1-10: Academic collocations, nuanced idioms
  paraphrase_distance: number;        // 1-10: Semantic distance between audio and prompt
  distractor_density: number;         // 1-10: Plausible false candidate answers
  correction_frequency: number;       // 1-10: Self-corrections, slips, retrospective edits
  speaker_switching: number;          // 1-10: Frequency of turns, overlaps, interjections
  answer_prediction_difficulty: number;// 1-10: Subversion of grammatical expectation
  numerical_density: number;          // 1-10: Clustering of numbers, dates, codes, prices
  syntactic_complexity: number;       // 1-10: Inversion, conditionals, concessive clauses
  accent_variation: number;           // 1-10: Variation in British, Aus, North American accents
}

export type DifficultyLevel = 'Standard' | 'Hard' | 'Brutal';

export interface DifficultyProfile {
  difficulty: number;                 // Overall 1-10
  level: DifficultyLevel;             // Standard (4-6), Hard (6-8), Brutal (8-10)
  factors: DifficultyFactors;
}

export type QuestionType =
  | 'gap_fill'
  | 'multiple_choice'
  | 'multiple_choice_multi'
  | 'matching'
  | 'map_labelling'
  | 'summary_completion';

export interface DistractorExplanation {
  choiceOrWord: string;
  trapReason: string;
}

export interface Question {
  id: number;                         // 1 - 40
  sectionId: 1 | 2 | 3 | 4;
  type: QuestionType;
  prompt: string;                     // Question prompt or heading
  instruction: string;                // e.g. "Write NO MORE THAN TWO WORDS AND/OR A NUMBER"
  contextBefore?: string;             // For gap fills: text preceding the blank
  contextAfter?: string;              // For gap fills: text succeeding the blank
  options?: string[];                 // For MCQs / matching
  maxSelectable?: number;             // For multiple_choice_multi (e.g. choose 2)
  acceptedAnswers: string[];          // Allowed normalized variations
  distractors: DistractorExplanation[];// Breakdown of every distractor
  evidenceQuote: string;              // Verbatim dialogue sentence containing the answer
  evidenceTimestamp?: string;         // e.g. "02:14"
  listeningTechnique: string;         // Cambridge mastery tip (e.g. "Signpost Negation")
  difficultyProfile: DifficultyProfile;
}

export interface AudioTurn {
  speaker: string;                    // e.g. "Dr. Vance", "Maya", "Leo"
  speakerRole: 'speaker1' | 'speaker2' | 'speaker3';
  accent?: 'en-GB' | 'en-AU' | 'en-US' | 'en-CA' | 'en-IN';
  text: string;
  isInterruption?: boolean;
  pauseAfterSeconds?: number;
}

export interface Section {
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  contextType: 'transactional' | 'social_monologue' | 'academic_discussion' | 'academic_lecture';
  audioScript: AudioTurn[];
  questions: Question[];              // Exactly 10 questions per section
}

export interface IELTSTest {
  id: number;                         // 1 - 100
  title: string;
  difficultyBandTarget: 'Hard (Band 7.5-8.5)' | 'Brutal (Band 8.5-9.0)';
  overallDifficulty: number;          // 1-10
  sections: [Section, Section, Section, Section];
}

export type UserAnswers = Record<number, string | string[]>;

export interface QuestionAnalysis {
  questionId: number;
  sectionId: 1 | 2 | 3 | 4;
  prompt: string;
  contextBefore?: string;
  contextAfter?: string;
  userAnswer: string;
  isCorrect: boolean;
  acceptedAnswers: string[];
  distractorHit?: string;
  distractorTrap?: string;
  evidenceQuote: string;
  listeningTechnique: string;
  difficultyProfile: DifficultyProfile;
}

export interface DiagnosticResult {
  bandScore: number;                  // 1.0 - 9.0
  rawScore: number;                   // 0 - 40
  totalQuestions: number;             // 40
  percentage: number;
  sectionScores: {
    sectionNumber: 1 | 2 | 3 | 4;
    correct: number;
    total: number;
    avgDifficulty: number;
  }[];
  questionsAnalysis: QuestionAnalysis[];
}
