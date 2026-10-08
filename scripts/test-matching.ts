import { checkAnswerMatch } from '../src/services/scoringEngine.js';
import { getTestById } from '../src/data/testRepository.js';

const test1 = getTestById(1);
const q5 = test1.sections[0].questions[4];

console.log('Testing Question 5 accepted answers:', q5.acceptedAnswers);

const candidateInputs = [
  'minibus',
  'Minibus',
  'MINIBUS',
  'minibus ',
  ' minibus',
  'a minibus',
  'the minibus',
  'mini bus',
  'mini-bus',
  'a mini-bus',
  'a mini bus',
  'minibuses'
];

let allPassed = true;
for (const input of candidateInputs) {
  const isMatch = checkAnswerMatch(input, q5.acceptedAnswers);
  console.log(`Input: "${input}" => Match: ${isMatch}`);
  if (!isMatch) {
    allPassed = false;
  }
}

if (!allPassed) {
  console.error('FAIL: Some valid inputs did not match!');
  process.exit(1);
} else {
  console.log('SUCCESS: All candidate input variations for minibus matched 100%!');
}
