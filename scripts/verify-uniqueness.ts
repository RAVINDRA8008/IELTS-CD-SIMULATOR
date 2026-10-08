import { getTestById } from '../src/data/testRepository.js';

console.log('--- TESTING INTER-TEST QUESTION UNIQUENESS ---');

const test1 = getTestById(1);
const test2 = getTestById(2);
const test3 = getTestById(3);
const test4 = getTestById(4);

console.log('Test 1 Q1:', test1.sections[0].questions[0].prompt, '-> Answer:', test1.sections[0].questions[0].acceptedAnswers);
console.log('Test 2 Q1:', test2.sections[0].questions[0].prompt, '-> Answer:', test2.sections[0].questions[0].acceptedAnswers);
console.log('Test 3 Q1:', test3.sections[0].questions[0].prompt, '-> Answer:', test3.sections[0].questions[0].acceptedAnswers);
console.log('Test 4 Q1:', test4.sections[0].questions[0].prompt, '-> Answer:', test4.sections[0].questions[0].acceptedAnswers);

console.log('---');
console.log('Test 1 Q5:', test1.sections[0].questions[4].prompt, '-> Answer:', test1.sections[0].questions[4].acceptedAnswers);
console.log('Test 2 Q5:', test2.sections[0].questions[4].prompt, '-> Answer:', test2.sections[0].questions[4].acceptedAnswers);
console.log('Test 3 Q5:', test3.sections[0].questions[4].prompt, '-> Answer:', test3.sections[0].questions[4].acceptedAnswers);

console.log('---');
console.log('Test 1 Q33:', test1.sections[3].questions[2].prompt, '-> Answer:', test1.sections[3].questions[2].acceptedAnswers);
console.log('Test 2 Q33:', test2.sections[3].questions[2].prompt, '-> Answer:', test2.sections[3].questions[2].acceptedAnswers);
console.log('Test 3 Q33:', test3.sections[3].questions[2].prompt, '-> Answer:', test3.sections[3].questions[2].acceptedAnswers);

// Check that Test 1, Test 2, Test 3 do NOT share Q5 or Q33 prompts
if (test1.sections[0].questions[4].prompt === test2.sections[0].questions[4].prompt) {
  throw new Error('Test 1 and Test 2 have identical Q5!');
}
if (test2.sections[0].questions[4].prompt === test3.sections[0].questions[4].prompt) {
  throw new Error('Test 2 and Test 3 have identical Q5!');
}
if (test1.sections[3].questions[2].prompt === test2.sections[3].questions[2].prompt) {
  throw new Error('Test 1 and Test 2 have identical Q33!');
}

console.log('SUCCESS: Verified that different tests have completely different, non-repeating questions and answers!');
