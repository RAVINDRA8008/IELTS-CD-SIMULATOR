import { IELTSTest, Section } from '../types/test';
import { generateProceduralSection1 } from './archetypes/s1Archetypes';
import { generateProceduralSection2 } from './archetypes/s2Archetypes';
import { generateProceduralSection3 } from './archetypes/s3Archetypes';
import { generateProceduralSection4 } from './archetypes/s4Archetypes';

// Seeded deterministic pseudo-random generator
function createRNG(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Topics for dynamic title
const TOPICS = [
  "Subglacial Volcanism & Cryospheric Geochemistry",
  "Acoustic Ecology of Deep-Sea Cetaceans",
  "Biomimetic Architectural Envelopes",
  "Paleoclimatic Varve Chronology in Alpine Lakes",
  "Mycorrhizal Fungal Networks and Forest Carbon Flux",
  "Urban Heat Archipelago Mitigation Strategies",
  "High-Latitude Peatland Methanogenesis",
  "Aerodynamic Boundary Layer Control in Hypersonic Craft",
  "Microplastic Bioaccumulation in Trophic Food Webs",
  "Synthetic Aperture Radar Interferometry in Land Subsidence",
  "Neuroplasticity and Spatial Navigation in Primates",
  "Lithium Extraction Geochemistry from Salar Brines",
  "Quantum Metrology in Gravitational Wave Observatories",
  "Hydrothermal Vent Endosymbiosis and Metabolic Pathways",
  "Dendroclimatological Signatures in Old-Growth Conifers",
  "Soil Carbon Sequestration via Regenerative Agriculture",
  "Tidal Energy Turbines & Benthic Habitat Disturbance",
  "Bacteriophage Therapeutics in Multidrug-Resistant Pathogens",
  "Volcanic Tephrochronology in Archaeological Stratigraphy",
  "Atmospheric Rivers and Extreme Precipitation Dynamics"
];

export function generateTest(testId: number): IELTSTest {
  const rng = createRNG(testId * 7727);
  const topicTitle = TOPICS[(testId - 1) % TOPICS.length];

  const s1 = generateProceduralSection1(testId, rng);
  const s2 = generateProceduralSection2(testId, rng);
  const s3 = generateProceduralSection3(testId, rng);
  const s4 = generateProceduralSection4(testId, rng);

  const sections: [Section, Section, Section, Section] = [s1, s2, s3, s4];

  // Calculate composite test difficulty
  let totalDiff = 0;
  let questionCount = 0;
  sections.forEach(s => {
    s.questions.forEach(q => {
      totalDiff += q.difficultyProfile?.difficulty ?? 7.0;
      questionCount++;
    });
  });

  const overallDifficulty = Math.round((totalDiff / (questionCount || 40)) * 10) / 10;
  const difficultyBandTarget: 'Hard (Band 7.5-8.5)' | 'Brutal (Band 8.5-9.0)' = overallDifficulty >= 8.2
    ? 'Brutal (Band 8.5-9.0)'
    : 'Hard (Band 7.5-8.5)';

  return {
    id: testId,
    title: `Test ${testId}: ${topicTitle}`,
    difficultyBandTarget,
    overallDifficulty,
    sections
  };
}
