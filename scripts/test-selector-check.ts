import { getAllTestSummaries } from '../src/data/testRepository.js';

const summaries = getAllTestSummaries();
console.log('Total tests:', summaries.length);
console.log('Min diff:', Math.min(...summaries.map(t => t.overallDifficulty)));
console.log('Max diff:', Math.max(...summaries.map(t => t.overallDifficulty)));
console.log('Overall diff counts:');
const freq: Record<number, number> = {};
summaries.forEach(s => {
  freq[s.overallDifficulty] = (freq[s.overallDifficulty] || 0) + 1;
});
console.log(freq);
console.log('Brutal (>=8.5):', summaries.filter(t => t.overallDifficulty >= 8.5).length);
console.log('Brutal (>=8.0):', summaries.filter(t => t.overallDifficulty >= 8.0).length);
console.log('Hard (<8.5):', summaries.filter(t => t.overallDifficulty < 8.5).length);
