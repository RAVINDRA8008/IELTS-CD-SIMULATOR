import { getTestById } from '../src/data/testRepository.js';

const typeCounts: Record<string, number> = {};
const sectionTypeCounts: Record<number, Record<string, number>> = {
  1: {}, 2: {}, 3: {}, 4: {}
};

for (let id = 1; id <= 100; id++) {
  const test = getTestById(id);
  test.sections.forEach(s => {
    s.questions.forEach(q => {
      typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
      sectionTypeCounts[s.sectionNumber][q.type] = (sectionTypeCounts[s.sectionNumber][q.type] || 0) + 1;
    });
  });
}

console.log('--- QUESTION TYPE DISTRIBUTION OVER 100 TESTS (4000 QUESTIONS) ---');
console.log('Overall:', typeCounts);
console.log('By Section:');
console.log('Section 1:', sectionTypeCounts[1]);
console.log('Section 2:', sectionTypeCounts[2]);
console.log('Section 3:', sectionTypeCounts[3]);
console.log('Section 4:', sectionTypeCounts[4]);
