import { DifficultyProfile } from '../../types/test';

export function generateDifficultyProfile(rng: () => number, sectionNum: number): DifficultyProfile {
  let baseDiff = 5.0;
  let level: 'Standard' | 'Hard' | 'Brutal' = 'Standard';

  if (sectionNum === 1) {
    baseDiff = 5.8 + rng() * 1.4; // 5.8 - 7.2
    level = baseDiff >= 6.5 ? 'Hard' : 'Standard';
  } else if (sectionNum === 2) {
    baseDiff = 6.8 + rng() * 1.4; // 6.8 - 8.2
    level = 'Hard';
  } else if (sectionNum === 3) {
    baseDiff = 8.0 + rng() * 1.6; // 8.0 - 9.6
    level = baseDiff >= 8.5 ? 'Brutal' : 'Hard';
  } else {
    baseDiff = 7.8 + rng() * 1.7; // 7.8 - 9.5
    level = baseDiff >= 8.5 ? 'Brutal' : 'Hard';
  }

  const round1 = (val: number) => Math.round(Math.min(10, Math.max(1, val)) * 10) / 10;
  const factor = (offset: number) => Math.round(Math.min(10, Math.max(3, baseDiff + (rng() * 2 - 1) + offset)));

  return {
    difficulty: round1(baseDiff),
    level,
    factors: {
      speech_rate: factor(sectionNum >= 3 ? 0.5 : 0),
      information_density: factor(sectionNum >= 3 ? 1.0 : 0.5),
      lexical_complexity: factor(sectionNum === 4 ? 1.5 : (sectionNum === 3 ? 1.0 : 0)),
      paraphrase_distance: factor(sectionNum >= 3 ? 1.2 : 0.8),
      distractor_density: factor(sectionNum === 3 ? 1.5 : 1.0),
      correction_frequency: factor(sectionNum === 3 ? 2.0 : (sectionNum === 1 ? 1.5 : -1)),
      speaker_switching: factor(sectionNum === 3 ? 2.5 : (sectionNum === 1 ? 1.0 : -3)),
      answer_prediction_difficulty: factor(sectionNum >= 3 ? 1.2 : 0.5),
      numerical_density: factor(sectionNum === 1 ? 1.8 : 0),
      syntactic_complexity: factor(sectionNum >= 3 ? 1.4 : 0.2),
      accent_variation: factor(0.5)
    }
  };
}
