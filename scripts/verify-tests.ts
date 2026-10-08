import { getTestById, getAllTestSummaries } from '../src/data/testRepository.js';
import { scoreTest, rawScoreToBandScore } from '../src/services/scoringEngine.js';

console.log('--- STARTING IELTS 100-TEST VALIDATION SUITE ---');

// 1. Verify summaries
const summaries = getAllTestSummaries();
console.log(`✓ Generated summaries for ${summaries.length} tests.`);
if (summaries.length !== 100) {
  throw new Error(`Expected 100 tests, found ${summaries.length}`);
}

let totalQuestionsCount = 0;
let totalSectionsCount = 0;
let totalTurnsCount = 0;

// 2. Validate all 100 tests in depth
for (let id = 1; id <= 100; id++) {
  const test = getTestById(id);

  if (!test.id || test.id !== id) {
    throw new Error(`Test id mismatch for test ${id}`);
  }

  if (test.sections.length !== 4) {
    throw new Error(`Test ${id} must have exactly 4 sections, got ${test.sections.length}`);
  }

  test.sections.forEach((sec, sIdx) => {
    totalSectionsCount++;
    const sNum = (sIdx + 1) as 1 | 2 | 3 | 4;

    if (sec.sectionNumber !== sNum) {
      throw new Error(`Test ${id} Section ${sIdx} has wrong sectionNumber ${sec.sectionNumber}`);
    }

    if (sec.questions.length !== 10) {
      throw new Error(`Test ${id} Section ${sNum} must have exactly 10 questions, got ${sec.questions.length}`);
    }

    if (!sec.audioScript || sec.audioScript.length < 2) {
      throw new Error(`Test ${id} Section ${sNum} has insufficient audio turns (${sec.audioScript?.length})`);
    }

    totalTurnsCount += sec.audioScript.length;

    // Validate Section 3 special academic constraints
    if (sNum === 3) {
      const hasInterruption = sec.audioScript.some(t => t.isInterruption);
      if (!hasInterruption) {
        throw new Error(`Test ${id} Section 3 must feature conversational interruptions.`);
      }
    }

    // Validate individual questions
    sec.questions.forEach((q) => {
      totalQuestionsCount++;
      if (q.acceptedAnswers.length === 0) {
        throw new Error(`Test ${id} Question ${q.id} has empty acceptedAnswers`);
      }
      if (!q.evidenceQuote) {
        throw new Error(`Test ${id} Question ${q.id} missing evidenceQuote`);
      }
      if (!q.listeningTechnique) {
        throw new Error(`Test ${id} Question ${q.id} missing listeningTechnique`);
      }

      // Validate Hardness Engine 11 factors
      const p = q.difficultyProfile;
      if (!p || p.difficulty < 1 || p.difficulty > 10) {
        throw new Error(`Test ${id} Question ${q.id} has invalid overall difficulty: ${p?.difficulty}`);
      }

      const f = p.factors;
      const requiredFactors = [
        'speech_rate', 'information_density', 'lexical_complexity', 'paraphrase_distance',
        'distractor_density', 'correction_frequency', 'speaker_switching',
        'answer_prediction_difficulty', 'numerical_density', 'syntactic_complexity', 'accent_variation'
      ];

      for (const rf of requiredFactors) {
        const val = (f as any)[rf];
        if (typeof val !== 'number' || val < 1 || val > 10) {
          throw new Error(`Test ${id} Question ${q.id} factor ${rf} invalid: ${val}`);
        }
      }
    });
  });
}

console.log(`✓ Verified 100 Tests: Exactly ${totalSectionsCount} sections, ${totalQuestionsCount} questions, and ${totalTurnsCount} audio dialogue turns.`);

// 3. Verify Band Score calculations
const sampleTest = getTestById(1);
const perfectAnswers: Record<number, string> = {};
sampleTest.sections.forEach(s => {
  s.questions.forEach(q => {
    perfectAnswers[q.id] = q.acceptedAnswers[0];
  });
});

const perfectResult = scoreTest(sampleTest, perfectAnswers);
if (perfectResult.rawScore !== 40 || perfectResult.bandScore !== 9.0) {
  throw new Error(`Perfect score failed: raw=${perfectResult.rawScore}, band=${perfectResult.bandScore}`);
}
console.log(`✓ Perfect score scoring verified: 40/40 -> Band 9.0`);

// Zero answers test
const zeroResult = scoreTest(sampleTest, {});
if (zeroResult.rawScore !== 0 || zeroResult.bandScore !== 1.0) {
  throw new Error(`Zero score failed: raw=${zeroResult.rawScore}, band=${zeroResult.bandScore}`);
}
console.log(`✓ Zero score scoring verified: 0/40 -> Band 1.0`);

// Band translation checks
if (rawScoreToBandScore(35) !== 8.0) throw new Error('Band 8.0 conversion mismatch');
if (rawScoreToBandScore(30) !== 7.0) throw new Error('Band 7.0 conversion mismatch');
if (rawScoreToBandScore(23) !== 6.0) throw new Error('Band 6.0 conversion mismatch');
console.log(`✓ Standard Cambridge Band Score thresholds verified (35->8.0, 30->7.0, 23->6.0).`);

console.log('--- ALL AUTOMATED VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
