import { IELTSTest } from '../types/test';
import { CURATED_TEST_1 } from './curatedTests';
import { generateTest } from './proceduralGenerator';

export interface TestSummary {
  id: number;
  title: string;
  difficultyBandTarget: string;
  overallDifficulty: number;
  sectionTopics: string[];
}

const testCache = new Map<number, IELTSTest>();
testCache.set(1, CURATED_TEST_1);

export function getTestById(id: number): IELTSTest {
  const safeId = Math.max(1, Math.min(100, id));
  if (testCache.has(safeId)) {
    return testCache.get(safeId)!;
  }

  const generated = generateTest(safeId);
  testCache.set(safeId, generated);
  return generated;
}

export function getAllTestSummaries(): TestSummary[] {
  const summaries: TestSummary[] = [];

  for (let i = 1; i <= 100; i++) {
    const test = getTestById(i);
    summaries.push({
      id: test.id,
      title: test.title,
      difficultyBandTarget: test.difficultyBandTarget,
      overallDifficulty: test.overallDifficulty,
      sectionTopics: test.sections.map(s => s.title)
    });
  }

  return summaries;
}
