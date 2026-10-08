import {
  IELTSTest,
  Question,
  UserAnswers,
  DiagnosticResult,
  QuestionAnalysis
} from '../types/test';

// Official IELTS Listening Raw to Band Score Conversion
export function rawScoreToBandScore(raw: number): number {
  if (raw >= 39) return 9.0;
  if (raw >= 37) return 8.5;
  if (raw >= 35) return 8.0;
  if (raw >= 32) return 7.5;
  if (raw >= 30) return 7.0;
  if (raw >= 26) return 6.5;
  if (raw >= 23) return 6.0;
  if (raw >= 18) return 5.5;
  if (raw >= 16) return 5.0;
  if (raw >= 13) return 4.5;
  if (raw >= 10) return 4.0;
  if (raw >= 8) return 3.5;
  if (raw >= 6) return 3.0;
  if (raw >= 4) return 2.5;
  if (raw >= 2) return 2.0;
  if (raw >= 1) return 1.5;
  return 1.0;
}

// Spelling variation mapping for Cambridge UK/US tolerance
const EQUIVALENT_TERMS: Record<string, string[]> = {
  color: ['colour', 'color'],
  colour: ['colour', 'color'],
  center: ['centre', 'center'],
  centre: ['centre', 'center'],
  theatre: ['theatre', 'theater'],
  theater: ['theatre', 'theater'],
  programme: ['programme', 'program'],
  program: ['programme', 'program'],
  travelling: ['traveling', 'travelling'],
  traveling: ['traveling', 'travelling'],
  organise: ['organize', 'organise'],
  organize: ['organize', 'organise'],
  analyse: ['analyze', 'analyse'],
  analyze: ['analyze', 'analyse'],
  cancelled: ['canceled', 'cancelled'],
  canceled: ['canceled', 'cancelled']
};

export function cleanText(ans: string | undefined | null): string {
  if (!ans) return '';
  return ans
    .toLowerCase()
    .replace(/[\u00A0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/g, ' ')
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\_`~()"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripArticles(text: string): string {
  return text.replace(/^(a|an|the)\s+/i, '').trim();
}

export function removeSpacesAndHyphens(text: string): string {
  return text.replace(/[-\s]/g, '').trim();
}

export function checkAnswerMatch(userAns: string, acceptedAnswers: string[]): boolean {
  const normUser = cleanText(userAns);
  if (!normUser) return false;

  const userNoArticle = stripArticles(normUser);
  const userCompressed = removeSpacesAndHyphens(normUser);
  const userNoArticleCompressed = removeSpacesAndHyphens(userNoArticle);

  for (const acc of acceptedAnswers) {
    const normAcc = cleanText(acc);
    if (!normAcc) continue;

    // 1. Direct clean match
    if (normUser === normAcc) return true;

    // 2. Article-stripped match (e.g. "a minibus" vs "minibus", "the compass" vs "compass")
    const accNoArticle = stripArticles(normAcc);
    if (userNoArticle === accNoArticle) return true;
    if (userNoArticle === normAcc) return true;
    if (normUser === accNoArticle) return true;

    // 3. Hyphen / Compound word tolerance (e.g. "mini-bus" vs "minibus" vs "mini bus", "half-board" vs "half board")
    const accCompressed = removeSpacesAndHyphens(normAcc);
    const accNoArticleCompressed = removeSpacesAndHyphens(accNoArticle);

    if (userCompressed === accCompressed) return true;
    if (userNoArticleCompressed === accNoArticleCompressed) return true;
    if (userCompressed === accNoArticleCompressed) return true;
    if (userNoArticleCompressed === accCompressed) return true;

    // 4. Singular / Plural tolerance where appropriate
    if (
      userNoArticle + 's' === accNoArticle ||
      accNoArticle + 's' === userNoArticle ||
      userNoArticle + 'es' === accNoArticle ||
      accNoArticle + 'es' === userNoArticle
    ) {
      return true;
    }

    // 5. Alphanumeric registration code prefix tolerance (e.g. "RC-1341" vs "1341", "RC1341" vs "1341")
    // Only applies if the longer string starts with letters (e.g. "rc") and ends with the exact digits of the shorter string
    const isCodePrefixMatch = (longer: string, shorter: string): boolean => {
      const match = longer.match(/^([a-z]{1,4})(\d+)$/i);
      return Boolean(match && match[2] === shorter);
    };

    if (isCodePrefixMatch(userCompressed, accCompressed) || isCodePrefixMatch(accCompressed, userCompressed)) {
      return true;
    }

    // 5. UK / US equivalent matches
    const userWords = userNoArticle.split(' ');
    const accWords = accNoArticle.split(' ');

    if (userWords.length === accWords.length) {
      let allMatch = true;
      for (let i = 0; i < userWords.length; i++) {
        const u = userWords[i];
        const a = accWords[i];
        if (u === a) continue;
        const equivalents = EQUIVALENT_TERMS[u] || [];
        if (!equivalents.includes(a)) {
          allMatch = false;
          break;
        }
      }
      if (allMatch) return true;
    }
  }

  return false;
}

export function scoreTest(test: IELTSTest, userAnswers: UserAnswers): DiagnosticResult {
  const allQuestions: Question[] = [];
  test.sections.forEach(s => allQuestions.push(...s.questions));

  let rawScore = 0;
  const questionsAnalysis: QuestionAnalysis[] = [];

  const sectionTotals: Record<number, { correct: number; total: number; sumDiff: number }> = {
    1: { correct: 0, total: 0, sumDiff: 0 },
    2: { correct: 0, total: 0, sumDiff: 0 },
    3: { correct: 0, total: 0, sumDiff: 0 },
    4: { correct: 0, total: 0, sumDiff: 0 }
  };

  allQuestions.forEach(q => {
    const userAnsRaw = userAnswers[q.id];
    let userAnsStr = '';
    let isCorrect = false;

    if (Array.isArray(userAnsRaw)) {
      userAnsStr = userAnsRaw.join(', ');
      // Check multi choice multi select
      const sortedUser = [...userAnsRaw].map(s => s.trim().toUpperCase()).sort().join('');
      const sortedAccepted = q.acceptedAnswers.map(a => a.replace(/[^A-Za-z]/g, '').toUpperCase().split('').sort().join(''));
      isCorrect = sortedAccepted.includes(sortedUser);
    } else {
      userAnsStr = (userAnsRaw || '').trim();
      isCorrect = checkAnswerMatch(userAnsStr, q.acceptedAnswers);
    }

    if (isCorrect) {
      rawScore++;
      sectionTotals[q.sectionId].correct++;
    }

    sectionTotals[q.sectionId].total++;
    sectionTotals[q.sectionId].sumDiff += q.difficultyProfile.difficulty;

    // Check distractor trap match
    let distractorHit: string | undefined = undefined;
    let distractorTrap: string | undefined = undefined;

    const normUser = cleanText(userAnsStr);
    for (const d of q.distractors) {
      if (checkAnswerMatch(normUser, [d.choiceOrWord])) {
        distractorHit = d.choiceOrWord;
        distractorTrap = d.trapReason;
        break;
      }
    }

    // Default primary distractor explanation if not exact match but incorrect
    if (!isCorrect && !distractorTrap && q.distractors.length > 0) {
      distractorTrap = q.distractors[0].trapReason;
      distractorHit = q.distractors[0].choiceOrWord;
    }

    questionsAnalysis.push({
      questionId: q.id,
      sectionId: q.sectionId,
      prompt: q.prompt,
      contextBefore: q.contextBefore,
      contextAfter: q.contextAfter,
      userAnswer: userAnsStr,
      isCorrect,
      acceptedAnswers: q.acceptedAnswers,
      distractorHit,
      distractorTrap,
      evidenceQuote: q.evidenceQuote,
      listeningTechnique: q.listeningTechnique,
      difficultyProfile: q.difficultyProfile
    });
  });

  const sectionScores = [1, 2, 3, 4].map(sNum => {
    const s = sectionTotals[sNum as 1 | 2 | 3 | 4];
    return {
      sectionNumber: sNum as 1 | 2 | 3 | 4,
      correct: s.correct,
      total: s.total,
      avgDifficulty: Math.round((s.sumDiff / (s.total || 1)) * 10) / 10
    };
  });

  const bandScore = rawScoreToBandScore(rawScore);
  const percentage = Math.round((rawScore / 40) * 100);

  return {
    bandScore,
    rawScore,
    totalQuestions: 40,
    percentage,
    sectionScores,
    questionsAnalysis
  };
}
