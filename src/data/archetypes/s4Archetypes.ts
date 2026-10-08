import { Section, AudioTurn, Question } from '../../types/test';
import { generateDifficultyProfile } from './helpers';

export interface S4Archetype {
  lectureTitle: string;
  description: string;
  build: (testId: number, rng: () => number) => { audio: AudioTurn[]; questions: Question[] };
}

export const S4_ARCHETYPES: S4Archetype[] = [
  // 1: Biomimetic Structural Resilience in Tall Architecture
  {
    lectureTitle: "Biomimetic Structural Resilience in Tall Architecture",
    description: "Professor Christopher Lang delivers an advanced lecture on structural resilience, aerodynamic shear, and biological morphology.",
    build: (testId, rng) => {
      const pct1 = 40 + ((testId * 3) % 15); // e.g. 40, 43, 46
      const pct2 = 30 + ((testId * 2) % 10); // e.g. 30, 32, 34
      const modelOrganism = "Venus flower basket";
      const reinforcingStrut = ["diagonal helical struts", "helical struts", "spiral cross-struts"][testId % 3];
      const botanicalFiber = ["lignin fibers", "cellulose fibrils", "pectin bonds"][testId % 3];
      const property = ["ductile", "porous", "flexible"][testId % 3];
      const engineeringSystem = "diagrid exoskeleton";

      const audio: AudioTurn[] = [
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Good morning. In today's advanced lecture on structural resilience, we explore biomimetic engineering in supertall architecture.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `When designing buildings exceeding four hundred meters, the primary physical threat is not gravity, but aerodynamic shear forces.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `As high-velocity wind flows past sheer planar facades, alternating vortex shedding induces destructive transverse oscillations.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Historically, civil engineers relied on massive tuned mass dampers suspended within building crowns.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Contemporary architects, however, examine marine biology. Consider the hexactinellid sponge, commonly termed the ${modelOrganism}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Its cylindrical lattice consists of square orthogonal grids reinforced by ${reinforcingStrut}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Stress simulations reveal this biological geometry dissipates dynamic loads by over ${pct1} percent.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `A terrestrial parallel is observed in natural bamboo. The dense outer periphery is reinforced by stiff ${botanicalFiber}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `In contrast, the inner core remains spongy and remarkably ${property}, dissipating violent bending forces.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Applying this gradient to high-rise construction inspired the ${engineeringSystem}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `By moving primary structural steel to the perimeter, engineers achieve a ${pct2} percent reduction in total steel consumption.` }
      ];

      const questions: Question[] = [
        { id: 31, sectionId: 4, type: 'gap_fill', prompt: "Primary physical force threatening buildings over 400 meters:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Primary threat: ", acceptedAnswers: ["aerodynamic shear forces", "aerodynamic shear", "shear forces"], distractors: [], evidenceQuote: `...the primary physical threat is not gravity, but aerodynamic shear forces.`, listeningTechnique: "Distinguish primary forces from secondary factors.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 32, sectionId: 4, type: 'gap_fill', prompt: "Destructive movements induced by alternating vortex shedding:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Induces destructive: ", acceptedAnswers: ["transverse oscillations", "oscillations"], distractors: [], evidenceQuote: `...alternating vortex shedding induces destructive transverse oscillations.`, listeningTechnique: "Capture dynamic engineering terms.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 33, sectionId: 4, type: 'gap_fill', prompt: "Traditional device historically suspended in building crowns:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Historically used: ", acceptedAnswers: ["tuned mass dampers", "mass dampers"], distractors: [], evidenceQuote: `Historically, civil engineers relied on massive tuned mass dampers...`, listeningTechnique: "Identify historical baseline devices.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 34, sectionId: 4, type: 'gap_fill', prompt: "Common name of the marine sponge organism studied:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Studied sponge: ", acceptedAnswers: [modelOrganism.toLowerCase(), "venus' flower basket"], distractors: [], evidenceQuote: `...commonly termed the ${modelOrganism}.`, listeningTechnique: "Capture common biological nomenclature.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 35, sectionId: 4, type: 'gap_fill', prompt: "Struts reinforcing the sponge's orthogonal grid:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Reinforced by: ", acceptedAnswers: [reinforcingStrut.toLowerCase()], distractors: [], evidenceQuote: `Its cylindrical lattice consists of square orthogonal grids reinforced by ${reinforcingStrut}.`, listeningTechnique: "Transcribe structural descriptors.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 36, sectionId: 4, type: 'gap_fill', prompt: "Percentage by which sponge geometry dissipates dynamic loads:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Dissipates loads by over: ", contextAfter: " %", acceptedAnswers: [String(pct1)], distractors: [{ choiceOrWord: String(pct2), trapReason: "Steel reduction percentage." }], evidenceQuote: `...dissipates dynamic loads by over ${pct1} percent.`, listeningTechnique: "Distinguish load dissipation percentages from steel reduction.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 37, sectionId: 4, type: 'gap_fill', prompt: "Dense botanical constituents reinforcing bamboo periphery:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Outer edge material: ", acceptedAnswers: [botanicalFiber.toLowerCase()], distractors: [], evidenceQuote: `The dense outer periphery is reinforced by stiff ${botanicalFiber}.`, listeningTechnique: "Identify specific botanical fibers.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 38, sectionId: 4, type: 'gap_fill', prompt: "Mechanical property of bamboo's inner core:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Inner core is spongy and: ", acceptedAnswers: [property.toLowerCase()], distractors: [], evidenceQuote: `In contrast, the inner core remains spongy and remarkably ${property}...`, listeningTechnique: "Capture coordinate adjectives.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 39, sectionId: 4, type: 'gap_fill', prompt: "Architectural frame system inspired by natural gradients:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Inspired the: ", acceptedAnswers: [engineeringSystem.toLowerCase(), "diagrid"], distractors: [], evidenceQuote: `Applying this gradient to high-rise construction inspired the ${engineeringSystem}.`, listeningTechnique: "Extract core technological innovations.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 40, sectionId: 4, type: 'gap_fill', prompt: "Percentage reduction achieved in structural steel consumption:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Steel reduction: ", contextAfter: " %", acceptedAnswers: [String(pct2)], distractors: [{ choiceOrWord: String(pct1), trapReason: "Biological dissipation percentage." }], evidenceQuote: `...engineers achieve a ${pct2} percent reduction in total steel consumption.`, listeningTechnique: "Capture final material savings figures.", difficultyProfile: generateDifficultyProfile(rng, 4) }
      ];

      return { audio, questions };
    }
  },

  // 2: Deep-Sea Hydrothermal Chemosynthesis
  {
    lectureTitle: "Deep-Sea Hydrothermal Chemosynthesis & Extremophile Biochemistry",
    description: "Professor Christopher Lang lectures on abyssal hydrothermal vent ecosystems, metabolic pathways, and industrial enzyme applications.",
    build: (testId, rng) => {
      const pct1 = 45 + ((testId * 4) % 15);
      const pct2 = 35 + ((testId * 2) % 12);
      const modelOrganism = "Riftia tubeworm";
      const organ = "trophosome tissue";
      const enzyme = ["thermostable polymerases", "metalloprotease enzymes", "hydrogenase complexes"][testId % 3];
      const property = ["crystalline", "impermeable", "viscous"][testId % 3];
      const engineeringSystem = "biocatalytic synthesis";

      const audio: AudioTurn[] = [
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Good afternoon. Today we examine biochemical adaptation in abyssal hydrothermal vent ecosystems.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `At depths exceeding two thousand meters, the primary physical constraint is extreme hydrostatic pressure.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Superheated vent fluids erupting from basalt chimneys generate toxic plumes rich in hydrogen sulfide.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Historically, marine biologists assumed all complex marine life relied fundamentally on solar photosynthesis.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `The discovery of hydrothermal vents disproved this, exemplified by the giant ${modelOrganism}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Lacking a digestive tract, the organism houses billions of endosymbionts inside specialized ${organ}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Laboratory assays indicate this chemotrophic fixation achieves an energy efficiency exceeding ${pct1} percent.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Furthermore, vent microbes synthesize extraordinarily heat-tolerant ${enzyme}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `Under three hundred atmospheres of pressure, their cellular membranes remain remarkably ${property}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `In pharmaceutical manufacturing, adopting these hydrothermal enzymes transformed ${engineeringSystem}.` },
        { speaker: "Professor Christopher Lang", speakerRole: 'speaker1', accent: 'en-GB', text: `By eliminating intermediate purification stages, chemical facilities achieve a ${pct2} percent reduction in operating costs.` }
      ];

      const questions: Question[] = [
        { id: 31, sectionId: 4, type: 'gap_fill', prompt: "Primary physical constraint defining abyssal depths:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Primary constraint: ", acceptedAnswers: ["hydrostatic pressure", "extreme hydrostatic pressure"], distractors: [], evidenceQuote: `...the primary physical constraint is extreme hydrostatic pressure.`, listeningTechnique: "Identify physical constraints in opening remarks.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 32, sectionId: 4, type: 'gap_fill', prompt: "Toxic chemical compound abundant in vent fluids:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Rich in: ", acceptedAnswers: ["hydrogen sulfide"], distractors: [], evidenceQuote: `...generate toxic plumes rich in hydrogen sulfide.`, listeningTechnique: "Capture chemical compounds.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 33, sectionId: 4, type: 'gap_fill', prompt: "Classical biological process previously assumed essential for all life:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Assumed dependent on: ", acceptedAnswers: ["solar photosynthesis", "photosynthesis"], distractors: [], evidenceQuote: `Historically, marine biologists assumed all complex marine life relied fundamentally on solar photosynthesis.`, listeningTechnique: "Capture superseded scientific assumptions.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 34, sectionId: 4, type: 'gap_fill', prompt: "Giant abyssal organism exemplifying chemotrophic life:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Exemplified by: ", acceptedAnswers: [modelOrganism.toLowerCase()], distractors: [], evidenceQuote: `...exemplified by the giant ${modelOrganism}.`, listeningTechnique: "Transcribe specific organism names.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 35, sectionId: 4, type: 'gap_fill', prompt: "Specialized tissue housing endosymbiotic bacteria:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Housed inside: ", acceptedAnswers: [organ.toLowerCase(), "trophosome"], distractors: [], evidenceQuote: `...houses billions of endosymbionts inside specialized ${organ}.`, listeningTechnique: "Capture biological anatomical terms.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 36, sectionId: 4, type: 'gap_fill', prompt: "Energy efficiency percentage achieved by chemotrophic fixation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Efficiency exceeding: ", contextAfter: " %", acceptedAnswers: [String(pct1)], distractors: [{ choiceOrWord: String(pct2), trapReason: "Operating cost reduction." }], evidenceQuote: `...achieves an energy efficiency exceeding ${pct1} percent.`, listeningTechnique: "Distinguish efficiency from cost savings.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 37, sectionId: 4, type: 'gap_fill', prompt: "Heat-tolerant biological molecules synthesized by vent microbes:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Synthesize: ", acceptedAnswers: [enzyme.toLowerCase()], distractors: [], evidenceQuote: `Furthermore, vent microbes synthesize extraordinarily heat-tolerant ${enzyme}.`, listeningTechnique: "Capture biochemical terms.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 38, sectionId: 4, type: 'gap_fill', prompt: "Physical state of cellular membranes under extreme pressure:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Membranes remain: ", acceptedAnswers: [property.toLowerCase()], distractors: [], evidenceQuote: `...their cellular membranes remain remarkably ${property}.`, listeningTechnique: "Isolate qualitative membrane descriptors.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 39, sectionId: 4, type: 'gap_fill', prompt: "Industrial manufacturing field transformed by vent enzymes:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Transformed: ", acceptedAnswers: [engineeringSystem.toLowerCase()], distractors: [], evidenceQuote: `...adopting these hydrothermal enzymes transformed ${engineeringSystem}.`, listeningTechnique: "Identify applied biotechnology fields.", difficultyProfile: generateDifficultyProfile(rng, 4) },
        { id: 40, sectionId: 4, type: 'gap_fill', prompt: "Percentage reduction achieved in operating costs:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Cost reduction: ", contextAfter: " %", acceptedAnswers: [String(pct2)], distractors: [{ choiceOrWord: String(pct1), trapReason: "Energy efficiency percentage." }], evidenceQuote: `...facilities achieve a ${pct2} percent reduction in operating costs.`, listeningTechnique: "Capture final economic benefit figures.", difficultyProfile: generateDifficultyProfile(rng, 4) }
      ];

      return { audio, questions };
    }
  }
];

export function generateProceduralSection4(testId: number, rng: () => number): Section {
  const archIndex = (testId * 11) % S4_ARCHETYPES.length;
  const arch = S4_ARCHETYPES[archIndex];
  const { audio, questions } = arch.build(testId, rng);

  return {
    sectionNumber: 4,
    title: `Section 4: Advanced Academic Lecture: ${arch.lectureTitle}`,
    description: arch.description,
    contextType: 'academic_lecture',
    audioScript: audio,
    questions
  };
}
