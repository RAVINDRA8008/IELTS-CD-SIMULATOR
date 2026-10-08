import { Section, AudioTurn, Question } from '../../types/test';
import { generateDifficultyProfile } from './helpers';

export interface S3Archetype {
  topicTitle: string;
  description: string;
  build: (testId: number, rng: () => number) => { audio: AudioTurn[]; questions: Question[] };
}

export const S3_ARCHETYPES: S3Archetype[] = [
  // 1: Glacial Dynamics & Subglacial Meltwater
  {
    topicTitle: "Subglacial Meltwater Hydrology & Basal Sliding",
    description: "Professor Vance, Leo, and Maya analyze conflicting glacier velocity data, correct telemetry errors, and prepare their symposium presentation.",
    build: (testId, rng) => {
      const station = ["Station 4", "Borehole 7", "Sensor Hub 2", "Telemetry Node 9"][testId % 4];
      const initialVal = 44 + ((testId * 3) % 18);
      const recalVal = initialVal - 14;
      const chemical = ["sulfur concentrations", "chloride isotopes", "silica precipitates"][testId % 3];
      const wrongRock = ["porous sandstone", "fractured shale", "weathered schist"][testId % 3];
      const oldStudy = ["Greenland survey", "Svalbard archive", "Patagonia dataset"][testId % 3];
      const trueRock = ["basaltic", "granitic", "dolomitic"][testId % 3];
      const talkTime = 15;
      const qaTime = 5;
      const cutSection = ["literature review", "equipment taxonomy", "historical methodology"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Maya, Leo, come in. Let's examine your telemetry draft on subglacial meltwater velocity. I spotted several discrepancies.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Right, Professor. In our initial calculation, our model projected a basal acceleration spike of ${initialVal} percent.` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', isInterruption: true, text: `Wait, sorry to interrupt Leo, but the sensor readings at ${station} suffered from hydrostatic calibration drift.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Quite right. Once we filtered out that corrupted telemetry, our initial ${initialVal} percent estimate dropped to ${recalVal} percent as our true empirical figure.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Good. And Maya, why did you eliminate volcanic geothermal heating as the primary catalyst?` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', text: `Because when we tested the runoff samples, ${chemical} were virtually negligible, ruling out geothermal heating entirely.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `That makes sense. Now Leo, looking at your cross-section graphic, you mistakenly drew ${wrongRock}.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Oh, that was an embarrassing copy error! That diagram was imported directly from our previous ${oldStudy}. The actual bedrock here is strictly ${trueRock}.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Please correct the graphic. Now, regarding your conference talk next Tuesday: what time constraints has the keynote panel set?` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', text: `The graduate committee limits presentations strictly to ${talkTime} minutes, followed by ${qaTime} minutes for examiner cross-examination.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `To meet that ${talkTime}-minute cap, we agreed to delete our ${cutSection} completely and start straight with our velocity curves.` }
      ];

      const questions: Question[] = [
        { id: 21, sectionId: 3, type: 'gap_fill', prompt: "Initial uncorrected basal acceleration projection:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Initial projection: ", contextAfter: " %", acceptedAnswers: [String(initialVal)], distractors: [{ choiceOrWord: String(recalVal), trapReason: "Recalibrated empirical figure." }], evidenceQuote: `...projected a basal acceleration spike of ${initialVal} percent.`, listeningTechnique: "Distinguish preliminary draft figures from recalibrated values.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 22, sectionId: 3, type: 'gap_fill', prompt: "Sensor location where readings suffered calibration drift:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Compromised sensor: ", acceptedAnswers: [station.toLowerCase()], distractors: [], evidenceQuote: `...sensor readings at ${station} suffered from hydrostatic...`, listeningTechnique: "Transcribe specific telemetry station tags.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 23, sectionId: 3, type: 'gap_fill', prompt: "Recalibrated empirical figure after filtering error:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Empirical figure: ", contextAfter: " %", acceptedAnswers: [String(recalVal)], distractors: [{ choiceOrWord: String(initialVal), trapReason: "Initial calculation." }], evidenceQuote: `...estimate dropped to ${recalVal} percent as our true empirical figure.`, listeningTechnique: "Capture revised empirical data following self-corrections.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 24, sectionId: 3, type: 'gap_fill', prompt: "Chemical signature found to be virtually negligible:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Negligible: ", acceptedAnswers: [chemical.toLowerCase()], distractors: [], evidenceQuote: `Because when we tested the runoff samples, ${chemical} were virtually negligible...`, listeningTechnique: "Capture chemical signatures that disprove competing hypotheses.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 25, sectionId: 3, type: 'gap_fill', prompt: "Erroneous rock type mistakenly drawn in the graphic:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Mistakenly drew: ", acceptedAnswers: [wrongRock.toLowerCase()], distractors: [{ choiceOrWord: trueRock.toLowerCase(), trapReason: "True bedrock." }], evidenceQuote: `...you mistakenly drew ${wrongRock}.`, listeningTechnique: "Isolate erroneous draft claims.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 26, sectionId: 3, type: 'gap_fill', prompt: "Origin study from which the mistaken diagram was copied:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Imported from: ", acceptedAnswers: [oldStudy.toLowerCase()], distractors: [], evidenceQuote: `That diagram was imported directly from our previous ${oldStudy}.`, listeningTechnique: "Identify sources of drafting errors.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 27, sectionId: 3, type: 'gap_fill', prompt: "Actual geological bedrock of the current study site:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "True bedrock: ", acceptedAnswers: [trueRock.toLowerCase()], distractors: [{ choiceOrWord: wrongRock.toLowerCase(), trapReason: "Drafting error." }], evidenceQuote: `The actual bedrock here is strictly ${trueRock}.`, listeningTechnique: "Extract definitive geological classifications.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 28, sectionId: 3, type: 'gap_fill', prompt: "Maximum allowable talk time for graduate presentation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Talk limit: ", contextAfter: " minutes", acceptedAnswers: [String(talkTime), "fifteen"], distractors: [{ choiceOrWord: String(qaTime), trapReason: "Q&A cross-examination time." }], evidenceQuote: `The graduate committee limits presentations strictly to ${talkTime} minutes...`, listeningTechnique: "Distinguish presentation delivery duration from Q&A time.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 29, sectionId: 3, type: 'gap_fill', prompt: "Time reserved strictly for examiner cross-examination:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Cross-examination: ", contextAfter: " minutes", acceptedAnswers: [String(qaTime), "five"], distractors: [{ choiceOrWord: String(talkTime), trapReason: "Talk time." }], evidenceQuote: `...followed by ${qaTime} minutes for examiner cross-examination.`, listeningTechnique: "Capture secondary time constraints.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 30, sectionId: 3, type: 'gap_fill', prompt: "Presentation segment eliminated completely:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Deleted segment: ", acceptedAnswers: [cutSection.toLowerCase()], distractors: [], evidenceQuote: `...we agreed to delete our ${cutSection} completely...`, listeningTechnique: "Identify elements sacrificed for time constraints.", difficultyProfile: generateDifficultyProfile(rng, 3) }
      ];

      return { audio, questions };
    }
  },

  // 2: Marine Cetacean Bioacoustics & Sonar Telemetry
  {
    topicTitle: "Marine Cetacean Bioacoustics & Sonar Telemetry",
    description: "Professor Vance reviews ocean acoustic telemetry data with graduate researchers, resolving hydrophone calibration and presentation pacing.",
    build: (testId, rng) => {
      const station = ["Buoy 7", "Hydrophone 3", "Array Node 5", "Mooring 8"][testId % 4];
      const initialVal = 48 + ((testId * 4) % 16);
      const recalVal = initialVal - 16;
      const chemical = ["ambient cavitation", "propeller noise", "tidal turbulence"][testId % 3];
      const wrongRock = ["abyssal plain", "continental shelf", "sand bank"][testId % 3];
      const oldStudy = ["Arctic transect", "Baltic survey", "North Sea survey"][testId % 3];
      const trueRock = ["volcanic trench", "submarine canyon", "rocky ridge"][testId % 3];
      const talkTime = 14;
      const qaTime = 6;
      const cutSection = ["historical taxonomy", "equipment calibration", "introductory slides"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome, team. Let's scrutinize your bioacoustics draft on deep-sea cetacean calls. I flagged some contradictory data.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Yes, Professor. In our preliminary acoustic model, we estimated an amplitude surge of ${initialVal} decibels.` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', isInterruption: true, text: `Wait, sorry to cut in Leo, but we discovered the acoustic recorder at ${station} was skewed by deep current vibrations.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `That's correct. Once we re-filtered the sound file, our preliminary ${initialVal} decibels corrected down to ${recalVal} decibels as our confirmed empirical reading.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Good recalibration. Maya, what empirical evidence disproved cargo shipping interference as the source?` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', text: `Spectral analysis showed ${chemical} was virtually negligible at these frequencies, ruling out vessel traffic.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Sensible deduction. But Leo, in your bathymetric profile, you erroneously labeled the seabed as a ${wrongRock}.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Ah, that was a clerical error! That map section was imported from our earlier ${oldStudy}. The actual seafloor habitat here is a ${trueRock}.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Ensure the diagram is updated. Now, regarding your graduate symposium defense next week:` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', text: `The committee limits graduate presentations to exactly ${talkTime} minutes, reserving ${qaTime} minutes for panel questions.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `To stay within ${talkTime} minutes, we decided to eliminate our ${cutSection} completely.` }
      ];

      const questions: Question[] = [
        { id: 21, sectionId: 3, type: 'gap_fill', prompt: "Preliminary estimated amplitude surge in decibels:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Initial estimate: ", contextAfter: " decibels", acceptedAnswers: [String(initialVal)], distractors: [{ choiceOrWord: String(recalVal), trapReason: "Recalibrated reading." }], evidenceQuote: `...estimated an amplitude surge of ${initialVal} decibels.`, listeningTechnique: "Distinguish preliminary estimates from confirmed figures.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 22, sectionId: 3, type: 'gap_fill', prompt: "Acoustic recorder station affected by current vibration:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Affected recorder: ", acceptedAnswers: [station.toLowerCase()], distractors: [], evidenceQuote: `...recorder at ${station} was skewed by deep current vibrations.`, listeningTechnique: "Capture specific acoustic station codes.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 23, sectionId: 3, type: 'gap_fill', prompt: "Confirmed empirical amplitude reading after filtering:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Confirmed reading: ", contextAfter: " decibels", acceptedAnswers: [String(recalVal)], distractors: [{ choiceOrWord: String(initialVal), trapReason: "Preliminary estimate." }], evidenceQuote: `...corrected down to ${recalVal} decibels as our confirmed empirical reading.`, listeningTechnique: "Extract corrected empirical readings.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 24, sectionId: 3, type: 'gap_fill', prompt: "Acoustic interference factor found to be negligible:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Negligible factor: ", acceptedAnswers: [chemical.toLowerCase()], distractors: [], evidenceQuote: `Spectral analysis showed ${chemical} was virtually negligible...`, listeningTechnique: "Identify negligible acoustic factors.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 25, sectionId: 3, type: 'gap_fill', prompt: "Erroneous seabed feature labeled on the profile:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Erroneously labeled: ", acceptedAnswers: [wrongRock.toLowerCase()], distractors: [{ choiceOrWord: trueRock.toLowerCase(), trapReason: "Actual habitat." }], evidenceQuote: `...you erroneously labeled the seabed as a ${wrongRock}.`, listeningTechnique: "Capture erroneous map labels.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 26, sectionId: 3, type: 'gap_fill', prompt: "Earlier project from which the mistaken map was imported:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Imported from: ", acceptedAnswers: [oldStudy.toLowerCase()], distractors: [], evidenceQuote: `That map section was imported from our earlier ${oldStudy}.`, listeningTechnique: "Identify source projects of errors.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 27, sectionId: 3, type: 'gap_fill', prompt: "Actual seafloor habitat classification:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Actual habitat: ", acceptedAnswers: [trueRock.toLowerCase()], distractors: [{ choiceOrWord: wrongRock.toLowerCase(), trapReason: "Clerical error." }], evidenceQuote: `The actual seafloor habitat here is a ${trueRock}.`, listeningTechnique: "Transcribe verified geological features.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 28, sectionId: 3, type: 'gap_fill', prompt: "Maximum allowable presentation time in minutes:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Presentation limit: ", contextAfter: " minutes", acceptedAnswers: [String(talkTime), "fourteen"], distractors: [{ choiceOrWord: String(qaTime), trapReason: "Question period." }], evidenceQuote: `...limits graduate presentations to exactly ${talkTime} minutes...`, listeningTechnique: "Separate talk time from question duration.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 29, sectionId: 3, type: 'gap_fill', prompt: "Time reserved strictly for panel questions:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Panel questions: ", contextAfter: " minutes", acceptedAnswers: [String(qaTime), "six"], distractors: [{ choiceOrWord: String(talkTime), trapReason: "Talk limit." }], evidenceQuote: `...reserving ${qaTime} minutes for panel questions.`, listeningTechnique: "Capture examination time allotments.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 30, sectionId: 3, type: 'gap_fill', prompt: "Slide presentation section eliminated completely:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Eliminated: ", acceptedAnswers: [cutSection.toLowerCase()], distractors: [], evidenceQuote: `...decided to eliminate our ${cutSection} completely.`, listeningTechnique: "Identify excised presentation sections.", difficultyProfile: generateDifficultyProfile(rng, 3) }
      ];

      return { audio, questions };
    }
  },

  // 3: Alpine Varve Chronology & Paleoclimatic Sediments
  {
    topicTitle: "Alpine Varve Chronology & Paleoclimatic Sediment Cores",
    description: "Professor Vance, Leo, and Maya resolve sediment coring anomalies and adjust their thesis symposium timings.",
    build: (testId, rng) => {
      const station = ["Core Rig 3", "Station Beta", "Piston Hub 6", "Borehole A"][testId % 4];
      const initialVal = 52 + ((testId * 3) % 15);
      const recalVal = initialVal - 15;
      const chemical = ["calcite precipitation", "clay smearing", "pyrite oxidation"][testId % 3];
      const wrongRock = ["limestone", "dolomite", "sandstone"][testId % 3];
      const oldStudy = ["Pyrenees database", "Apennine survey", "Carpathian study"][testId % 3];
      const trueRock = ["diatomite", "siltstone", "mudstone"][testId % 3];
      const talkTime = 16;
      const qaTime = 4;
      const cutSection = ["equipment methodology", "sample preparation", "historical review"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Come in, team. Let's look over your alpine varve sediment core draft. There is a statistical mismatch in your sedimentation rates.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Right, Professor. In our initial calculation, our model projected an annual sedimentation rate of ${initialVal} millimeters.` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', isInterruption: true, text: `Sorry to interrupt Leo, but the core retrieval at ${station} suffered from mechanical compaction.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Indeed. Once we adjusted for that barrel compaction, our initial ${initialVal} millimeters adjusted down to ${recalVal} millimeters as our confirmed empirical figure.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Very good. And Maya, why did you eliminate seismic turbidites as the cause of the dense laminations?` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', text: `When we isolated the chemical signature, ${chemical} was virtually negligible, proving it was strictly seasonal meltwater deposition.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Well deduced. Now Leo, your geological column diagram mistakenly lists ${wrongRock} as the base layer.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `Yes, that was a mistake on my part. That diagram was imported from our previous ${oldStudy}. The true sedimentary base is strictly ${trueRock}.` },
        { speaker: "Professor Vance", speakerRole: 'speaker1', accent: 'en-GB', text: `Please correct the column. Now, regarding your conference session timings next week:` },
        { speaker: "Maya", speakerRole: 'speaker3', accent: 'en-AU', text: `The session committee restricts graduate talks to ${talkTime} minutes, with ${qaTime} minutes allocated for audience questions.` },
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `We plan to delete our ${cutSection} completely to stay within the allotted ${talkTime} minutes.` }
      ];

      const questions: Question[] = [
        { id: 21, sectionId: 3, type: 'gap_fill', prompt: "Initial unadjusted annual sedimentation rate in mm:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Initial rate: ", contextAfter: " millimeters", acceptedAnswers: [String(initialVal)], distractors: [{ choiceOrWord: String(recalVal), trapReason: "Confirmed empirical figure." }], evidenceQuote: `...annual sedimentation rate of ${initialVal} millimeters.`, listeningTechnique: "Capture unadjusted draft values.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 22, sectionId: 3, type: 'gap_fill', prompt: "Sediment coring station affected by barrel compaction:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Compacted station: ", acceptedAnswers: [station.toLowerCase()], distractors: [], evidenceQuote: `...core retrieval at ${station} suffered from mechanical compaction.`, listeningTechnique: "Transcribe coring station tags.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 23, sectionId: 3, type: 'gap_fill', prompt: "Confirmed empirical sedimentation rate in mm:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Empirical rate: ", contextAfter: " millimeters", acceptedAnswers: [String(recalVal)], distractors: [{ choiceOrWord: String(initialVal), trapReason: "Unadjusted rate." }], evidenceQuote: `...adjusted down to ${recalVal} millimeters as our confirmed empirical figure.`, listeningTechnique: "Extract corrected empirical figures.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 24, sectionId: 3, type: 'gap_fill', prompt: "Chemical signature found to be virtually negligible:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Negligible: ", acceptedAnswers: [chemical.toLowerCase()], distractors: [], evidenceQuote: `When we isolated the chemical signature, ${chemical} was virtually negligible...`, listeningTechnique: "Identify negligible geological signatures.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 25, sectionId: 3, type: 'gap_fill', prompt: "Erroneous base layer rock type mistakenly listed:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Mistakenly lists: ", acceptedAnswers: [wrongRock.toLowerCase()], distractors: [{ choiceOrWord: trueRock.toLowerCase(), trapReason: "True sedimentary base." }], evidenceQuote: `...diagram mistakenly lists ${wrongRock} as the base layer.`, listeningTechnique: "Isolate erroneous draft claims.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 26, sectionId: 3, type: 'gap_fill', prompt: "Previous study from which the diagram was imported:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Imported from: ", acceptedAnswers: [oldStudy.toLowerCase()], distractors: [], evidenceQuote: `That diagram was imported from our previous ${oldStudy}.`, listeningTechnique: "Identify source research projects.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 27, sectionId: 3, type: 'gap_fill', prompt: "Actual sedimentary rock of the study base layer:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "True base: ", acceptedAnswers: [trueRock.toLowerCase()], distractors: [{ choiceOrWord: wrongRock.toLowerCase(), trapReason: "Mistake." }], evidenceQuote: `The true sedimentary base is strictly ${trueRock}.`, listeningTechnique: "Capture confirmed geological classifications.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 28, sectionId: 3, type: 'gap_fill', prompt: "Maximum allowable talk time in minutes:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Talk time: ", contextAfter: " minutes", acceptedAnswers: [String(talkTime), "sixteen"], distractors: [{ choiceOrWord: String(qaTime), trapReason: "Question period." }], evidenceQuote: `...restricts graduate talks to ${talkTime} minutes...`, listeningTechnique: "Distinguish talk duration from audience questions.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 29, sectionId: 3, type: 'gap_fill', prompt: "Time allocated for audience questions:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Audience questions: ", contextAfter: " minutes", acceptedAnswers: [String(qaTime), "four"], distractors: [{ choiceOrWord: String(talkTime), trapReason: "Talk time." }], evidenceQuote: `...with ${qaTime} minutes allocated for audience questions.`, listeningTechnique: "Capture question time allocations.", difficultyProfile: generateDifficultyProfile(rng, 3) },
        { id: 30, sectionId: 3, type: 'gap_fill', prompt: "Slide section deleted completely from talk:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Deleted: ", acceptedAnswers: [cutSection.toLowerCase()], distractors: [], evidenceQuote: `We plan to delete our ${cutSection} completely...`, listeningTechnique: "Identify omitted slide sections.", difficultyProfile: generateDifficultyProfile(rng, 3) }
      ];

      return { audio, questions };
    }
  }
];

export function generateProceduralSection3(testId: number, rng: () => number): Section {
  const archIndex = (testId * 7) % S3_ARCHETYPES.length;
  const arch = S3_ARCHETYPES[archIndex];
  const { audio, questions } = arch.build(testId, rng);

  return {
    sectionNumber: 3,
    title: `Section 3: Seminar Tutorial: ${arch.topicTitle}`,
    description: arch.description,
    contextType: 'academic_discussion',
    audioScript: audio,
    questions
  };
}
