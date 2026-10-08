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
        // Q21: Multiple Choice (Station - Turn 2)
        {
          id: 21,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Which sensor location suffered from hydrostatic calibration drift?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${station}`,
            `B) Base Camp 1`,
            `C) Summit Node Alpha`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...sensor readings at ${station} suffered from hydrostatic calibration drift.`,
          listeningTechnique: "Transcribe specific telemetry station tags under debate.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q22: Multiple Choice (Recalibrated - Turn 3)
        {
          id: 22,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "What was the final recalibrated figure for basal acceleration after correcting sensor drift?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${initialVal} percent`,
            `B) ${recalVal} percent`,
            `C) ${recalVal + 6} percent`
          ],
          acceptedAnswers: ["B", `${recalVal} percent`, `${recalVal}%`, String(recalVal)],
          distractors: [{ choiceOrWord: "A", trapReason: `Initial uncorrected estimate before Maya's interruption.` }],
          evidenceQuote: `...estimate dropped to ${recalVal} percent as our true empirical figure.`,
          listeningTechnique: "Listen through conversational interruptions to catch the revised empirical value.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q23: Multiple Choice (Geothermal - Turn 5)
        {
          id: 23,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Why was volcanic geothermal heating ruled out as the primary catalyst?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) Because water temperatures were below freezing`,
            `B) Because ${chemical} were virtually negligible in runoff samples`,
            `C) Because satellite infrared showed no subterranean magma`
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `Because when we tested the runoff samples, ${chemical} were virtually negligible, ruling out geothermal heating entirely.`,
          listeningTechnique: "Identify specific chemical evidence that disproves a competing hypothesis.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q24: Gap Fill (Wrong rock - Turn 6)
        {
          id: 24,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Erroneous rock type mistakenly drawn in the cross-section:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Mistakenly drew: ",
          acceptedAnswers: [wrongRock.toLowerCase()],
          distractors: [{ choiceOrWord: trueRock.toLowerCase(), trapReason: "True bedrock." }],
          evidenceQuote: `...you mistakenly drew ${wrongRock}.`,
          listeningTechnique: "Isolate erroneous draft claims.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q25: Gap Fill (Old study - Turn 7)
        {
          id: 25,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Origin study from which the mistaken diagram was imported:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Imported from: ",
          acceptedAnswers: [oldStudy.toLowerCase()],
          distractors: [],
          evidenceQuote: `That diagram was imported directly from our previous ${oldStudy}.`,
          listeningTechnique: "Identify sources of drafting errors.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q26: Gap Fill (True bedrock - Turn 7)
        {
          id: 26,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Actual geological bedrock of the current study site:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "True bedrock: ",
          acceptedAnswers: [trueRock.toLowerCase()],
          distractors: [{ choiceOrWord: wrongRock.toLowerCase(), trapReason: "Drafting error." }],
          evidenceQuote: `The actual bedrock here is strictly ${trueRock}.`,
          listeningTechnique: "Extract definitive geological classifications.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q27: Gap Fill (Talk time - Turn 9)
        {
          id: 27,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Maximum allowable talk time for the graduate presentation:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Talk cap: ",
          contextAfter: " minutes",
          acceptedAnswers: [String(talkTime), "fifteen"],
          distractors: [{ choiceOrWord: String(qaTime), trapReason: "Q&A cross-examination time." }],
          evidenceQuote: `The graduate committee limits presentations strictly to ${talkTime} minutes...`,
          listeningTechnique: "Distinguish presentation delivery duration from Q&A time.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q28: Gap Fill (QA time - Turn 9)
        {
          id: 28,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Time reserved strictly for examiner cross-examination:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Examiner Q&A: ",
          contextAfter: " minutes",
          acceptedAnswers: [String(qaTime), "five"],
          distractors: [{ choiceOrWord: String(talkTime), trapReason: "Talk time." }],
          evidenceQuote: `...followed by ${qaTime} minutes for examiner cross-examination.`,
          listeningTechnique: "Capture secondary time constraints.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q29: Multiple Choice (Multi-Select: Choose 2 - Turn 10)
        {
          id: 29,
          sectionId: 3,
          type: 'multiple_choice_multi',
          prompt: "Which TWO modifications did the students agree to make to stay within their presentation time cap?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            `A) Delete their ${cutSection} completely`,
            `B) Start straight with their velocity curves`,
            `C) Double the total presentation time to 40 minutes`,
            `D) Exclude all velocity curves from the slideshow`,
            `E) Decline examiner cross-examination questions`
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, B", "AB", "B, A", "BA"],
          distractors: [{ choiceOrWord: "C", trapReason: "Talk time was strictly capped at 15 minutes." }],
          evidenceQuote: `...we agreed to delete our ${cutSection} completely and start straight with our velocity curves.`,
          listeningTechnique: "Track multiple agreed symposium revisions across dialogue turns.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q30: Multiple Choice (Turn 10)
        {
          id: 30,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "What will the students present at the very beginning of their talk?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) Their ${cutSection}`,
            `B) Their velocity curves directly`,
            `C) A biography of previous researchers`
          ],
          acceptedAnswers: ["B"],
          distractors: [{ choiceOrWord: "A", trapReason: "Deleted completely to save time." }],
          evidenceQuote: `...we agreed to delete our ${cutSection} completely and start straight with our velocity curves.`,
          listeningTechnique: "Identify presentation opening strategies following content cuts.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        }
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
        { speaker: "Leo", speakerRole: 'speaker2', accent: 'en-US', text: `To stay within ${talkTime} minutes, we decided to eliminate our ${cutSection} completely and focus on our hydrophone findings.` }
      ];

      const questions: Question[] = [
        // Q21: Multiple Choice (Station - Turn 2)
        {
          id: 21,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Which acoustic sensor location was skewed by deep current vibrations?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${station}`,
            `B) Base Camp 1`,
            `C) Harbor Buoy 4`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...acoustic recorder at ${station} was skewed by deep current vibrations.`,
          listeningTechnique: "Identify specific corrupted sensor nodes.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q22: Multiple Choice (Recalibrated - Turn 3)
        {
          id: 22,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "What was the confirmed empirical amplitude reading after filtering?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${initialVal} decibels`,
            `B) ${recalVal} decibels`,
            `C) ${recalVal + 8} decibels`
          ],
          acceptedAnswers: ["B", `${recalVal} decibels`, `${recalVal}db`, String(recalVal)],
          distractors: [{ choiceOrWord: "A", trapReason: "Unfiltered amplitude reading before cleaning telemetry." }],
          evidenceQuote: `...preliminary ${initialVal} decibels corrected down to ${recalVal} decibels as our confirmed empirical reading.`,
          listeningTechnique: "Listen through conversational corrections for empirical figures.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q23: Multiple Choice (Cargo shipping - Turn 5)
        {
          id: 23,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "What empirical evidence disproved cargo shipping interference?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) Radar tracking confirmed no vessels within 50 miles",
            `B) Spectral analysis showed ${chemical} was virtually negligible`,
            "C) The acoustic frequencies were too low for vessel propellers"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `Spectral analysis showed ${chemical} was virtually negligible at these frequencies, ruling out vessel traffic.`,
          listeningTechnique: "Detect diagnostic evidence eliminating external variables.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q24: Gap Fill (Wrong rock - Turn 6)
        {
          id: 24,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Erroneously labeled seafloor habitat in the draft bathymetric profile:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Erroneous seafloor: ",
          acceptedAnswers: [wrongRock.toLowerCase()],
          distractors: [{ choiceOrWord: trueRock.toLowerCase(), trapReason: "Confirmed seafloor." }],
          evidenceQuote: `...you erroneously labeled the seabed as a ${wrongRock}.`,
          listeningTechnique: "Identify erroneous drafting terms.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q25: Gap Fill (Old study - Turn 7)
        {
          id: 25,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Previous transect from which the map section was imported:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Imported from: ",
          acceptedAnswers: [oldStudy.toLowerCase()],
          distractors: [],
          evidenceQuote: `That map section was imported from our earlier ${oldStudy}.`,
          listeningTechnique: "Record source references.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q26: Gap Fill (True bedrock - Turn 7)
        {
          id: 26,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Confirmed seafloor classification of the target site:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "True habitat: ",
          acceptedAnswers: [trueRock.toLowerCase()],
          distractors: [{ choiceOrWord: wrongRock.toLowerCase(), trapReason: "Clerical error." }],
          evidenceQuote: `The actual seafloor habitat here is a ${trueRock}.`,
          listeningTechnique: "Note correct ecological designations.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q27: Gap Fill (Talk time - Turn 9)
        {
          id: 27,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Maximum duration permitted for the graduate presentation:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Maximum duration: ",
          contextAfter: " minutes",
          acceptedAnswers: [String(talkTime), "fourteen"],
          distractors: [{ choiceOrWord: String(qaTime), trapReason: "Q&A question period." }],
          evidenceQuote: `The committee limits graduate presentations to exactly ${talkTime} minutes...`,
          listeningTechnique: "Extract allocated presentation duration.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q28: Gap Fill (QA time - Turn 9)
        {
          id: 28,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Time allocated for questions from the panel:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Panel questions: ",
          contextAfter: " minutes",
          acceptedAnswers: [String(qaTime), "six"],
          distractors: [{ choiceOrWord: String(talkTime), trapReason: "Presentation time." }],
          evidenceQuote: `...reserving ${qaTime} minutes for panel questions.`,
          listeningTechnique: "Isolate discussion time buffers.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q29: Multiple Choice (Multi-Select: Choose 2 - Turn 10)
        {
          id: 29,
          sectionId: 3,
          type: 'multiple_choice_multi',
          prompt: "Which TWO decisions did the researchers make regarding their symposium defense?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            `A) Eliminate their ${cutSection} completely`,
            `B) Focus directly on their hydrophone findings`,
            `C) Postpone the panel defense by two weeks`,
            `D) Remove all hydrophone spectrograms from their report`,
            `E) Allow spectators to question them during the talk`
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, B", "AB", "B, A", "BA"],
          distractors: [],
          evidenceQuote: `To stay within ${talkTime} minutes, we decided to eliminate our ${cutSection} completely and focus on our hydrophone findings.`,
          listeningTechnique: "Identify seminar delivery adjustments across speaker proposals.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q30: Multiple Choice (Turn 10)
        {
          id: 30,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Why did the researchers decide to eliminate that slide section?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) Because the projector was faulty",
            `B) To stay within the ${talkTime}-minute cap`,
            "C) Because the professor rejected their data"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `To stay within ${talkTime} minutes, we decided to eliminate our ${cutSection} completely and focus on our hydrophone findings.`,
          listeningTechnique: "Correlate presentation edits with time limits.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        }
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
        // Q21: Multiple Choice (Station - Turn 2)
        {
          id: 21,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Which station suffered from barrel compaction during sediment core retrieval?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${station}`,
            `B) Lake Valley Outpost`,
            `C) Glacier Base 4`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...core retrieval at ${station} suffered from mechanical compaction.`,
          listeningTechnique: "Transcribe coring station tags.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q22: Multiple Choice (Recalibrated - Turn 3)
        {
          id: 22,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "What was the confirmed empirical sedimentation rate after adjusting for compaction?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${initialVal} millimeters`,
            `B) ${recalVal} millimeters`,
            `C) ${recalVal + 8} millimeters`
          ],
          acceptedAnswers: ["B", `${recalVal} millimeters`, String(recalVal)],
          distractors: [{ choiceOrWord: "A", trapReason: "Unadjusted rate before accounting for mechanical compaction." }],
          evidenceQuote: `...adjusted down to ${recalVal} millimeters as our confirmed empirical figure.`,
          listeningTechnique: "Extract corrected empirical sedimentation figures.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q23: Multiple Choice (Turbidites - Turn 5)
        {
          id: 23,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Why were seismic turbidites eliminated as the cause of dense laminations?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) Earthquakes were not recorded in that century`,
            `B) ${chemical} was virtually negligible in chemical testing`,
            `C) Lake depths were too shallow for turbidite formation`
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `When we isolated the chemical signature, ${chemical} was virtually negligible, proving it was strictly seasonal meltwater deposition.`,
          listeningTechnique: "Identify negligible geological signatures.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q24: Gap Fill (Wrong rock - Turn 6)
        {
          id: 24,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Erroneous base layer rock type mistakenly listed:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "Mistakenly lists: ",
          acceptedAnswers: [wrongRock.toLowerCase()],
          distractors: [{ choiceOrWord: trueRock.toLowerCase(), trapReason: "True sedimentary base." }],
          evidenceQuote: `...diagram mistakenly lists ${wrongRock} as the base layer.`,
          listeningTechnique: "Isolate erroneous draft claims.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q25: Gap Fill (Old study - Turn 7)
        {
          id: 25,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Previous study from which the diagram was imported:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Imported from: ",
          acceptedAnswers: [oldStudy.toLowerCase()],
          distractors: [],
          evidenceQuote: `That diagram was imported from our previous ${oldStudy}.`,
          listeningTechnique: "Identify source research projects.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q26: Gap Fill (True bedrock - Turn 7)
        {
          id: 26,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Actual sedimentary rock of the study base layer:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "True base: ",
          acceptedAnswers: [trueRock.toLowerCase()],
          distractors: [{ choiceOrWord: wrongRock.toLowerCase(), trapReason: "Mistake." }],
          evidenceQuote: `The true sedimentary base is strictly ${trueRock}.`,
          listeningTechnique: "Capture confirmed geological classifications.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q27: Gap Fill (Talk time - Turn 9)
        {
          id: 27,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Maximum allowable talk time in minutes:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Talk time: ",
          contextAfter: " minutes",
          acceptedAnswers: [String(talkTime), "sixteen"],
          distractors: [{ choiceOrWord: String(qaTime), trapReason: "Question period." }],
          evidenceQuote: `...restricts graduate talks to ${talkTime} minutes...`,
          listeningTechnique: "Distinguish talk duration from audience questions.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q28: Gap Fill (QA time - Turn 9)
        {
          id: 28,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Time allocated for audience questions:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Audience questions: ",
          contextAfter: " minutes",
          acceptedAnswers: [String(qaTime), "four"],
          distractors: [{ choiceOrWord: String(talkTime), trapReason: "Talk time." }],
          evidenceQuote: `...with ${qaTime} minutes allocated for audience questions.`,
          listeningTechnique: "Capture question time allocations.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q29: Multiple Choice (Multi-Select: Choose 2 - Turn 10)
        {
          id: 29,
          sectionId: 3,
          type: 'multiple_choice_multi',
          prompt: "Which TWO actions will the students take before the conference session?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            `A) Delete their ${cutSection} completely`,
            `B) Adhere strictly to the ${talkTime}-minute presentation limit`,
            `C) Request a thirty-minute speaking extension`,
            `D) Replace all varve sediment cores with fresh samples`,
            `E) Decline all questions from the audience`
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, B", "AB", "B, A", "BA"],
          distractors: [],
          evidenceQuote: `We plan to delete our ${cutSection} completely to stay within the allotted ${talkTime} minutes.`,
          listeningTechnique: "Track multiple concurrent symposium preparation decisions.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        },
        // Q30: Multiple Choice (Turn 10)
        {
          id: 30,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "How will the students ensure they do not exceed their speaking time limit?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) By speaking at double their normal speed",
            `B) By deleting their ${cutSection} completely`,
            "C) By skipping audience questions entirely"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `We plan to delete our ${cutSection} completely to stay within the allotted ${talkTime} minutes.`,
          listeningTechnique: "Identify specific measures taken to adhere to strict academic speaking limits.",
          difficultyProfile: generateDifficultyProfile(rng, 3)
        }
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
