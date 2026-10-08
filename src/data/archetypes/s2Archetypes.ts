import { Section, AudioTurn, Question } from '../../types/test';
import { generateDifficultyProfile } from './helpers';

export interface S2Archetype {
  venueTitle: string;
  description: string;
  build: (testId: number, rng: () => number) => { audio: AudioTurn[]; questions: Question[] };
}

export const S2_ARCHETYPES: S2Archetype[] = [
  // 1: Botanical Arboretum & Tree Canopy Walkway
  {
    venueTitle: "Blackwood Botanical Arboretum & Tree Canopy Walkway",
    description: "Lead Curator Julian Henderson delivers an orientation talk and safety briefing on the arboretum's history, funding, and restricted zones.",
    build: (testId, rng) => {
      const year = 1855 + ((testId * 7) % 45);
      const damage = ["subsidence damage", "severe gale collapse", "fungal blight rot"][testId % 3];
      const renoYear = 1985 + ((testId * 3) % 35);
      const conservPct = 50 + ((testId * 4) % 20); // e.g. 50, 54, 58...
      const eduPct = 30;
      const secPct = 20 - (conservPct - 50); // sums up cleanly
      const permArea = ["exterior gardens", "canopy walkways", "outer terraces"][testId % 3];
      const chamber = "Conservation Specimen Chamber";
      const fragileItem = ["historical dyes", "herbarium sheets", "seed embryos"][testId % 3];
      const signal = ["warning bell", "closing chime", "evacuation siren"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to Blackwood Botanical Arboretum. I am Julian Henderson, head curator. To begin with our historical origins: the estate grounds were officially founded in ${year}.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `However, the public grounds were abandoned for decades following extensive ${damage} to the Victorian greenhouses.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `After painstaking restoration by botanical specialists, official public reopening was celebrated in ${renoYear}.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Today, exactly ${conservPct} percent of all ticket admissions are allocated to rare species conservation.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Meanwhile, a further ${eduPct} percent directly funds regional school education programs.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `The remaining ${secPct} percent of our revenue is reserved strictly for site security overhead.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Turning to visitor regulations: personal photography is permitted throughout all ${permArea}.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `However, inside the ${chamber}, all camera flashes and tripod mountings are strictly prohibited.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `This strict ban is essential to protect ${fragileItem} from ultraviolet light degradation.` },
        { speaker: "Curator Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Lastly, when dusk approaches, staff will sound the ${signal} fifteen minutes before gates lock.` }
      ];

      const questions: Question[] = [
        // Q11: Multiple Choice
        {
          id: 11,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When were the arboretum estate grounds originally founded?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year - 15}`,
            `B) ${year}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["B", String(year)],
          distractors: [{ choiceOrWord: "C", trapReason: `Year ${renoYear} was the reopening milestone.` }],
          evidenceQuote: `...estate grounds were officially founded in ${year}.`,
          listeningTechnique: "Distinguish original founding dates from modern reopening years.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q12: Multiple Choice
        {
          id: 12,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "Why were the public grounds abandoned for several decades?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) Due to severe ${damage}`,
            `B) Because of financial bankruptcy`,
            `C) Due to local council rezoning`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...abandoned for decades following extensive ${damage} to the Victorian greenhouses.`,
          listeningTechnique: "Identify physical causes of prolonged facility closure.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q13: Multiple Choice
        {
          id: 13,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "In which year did the arboretum officially reopen to the public?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${renoYear - 10}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["C", String(renoYear)],
          distractors: [{ choiceOrWord: "A", trapReason: `Original founding year ${year}.` }],
          evidenceQuote: `...official public reopening was celebrated in ${renoYear}.`,
          listeningTechnique: "Isolate final restoration and public reopening milestones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q14: Multiple Choice (Multi-Select: Choose 2)
        {
          id: 14,
          sectionId: 2,
          type: 'multiple_choice_multi',
          prompt: "Which TWO programs receive funding directly from visitor ticket admissions?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            "A) Rare species conservation",
            "B) International luxury expeditions",
            "C) Regional school education programs",
            "D) Commercial timber logging",
            "E) Private trustee dividends"
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, C", "AC", "C, A", "CA"],
          distractors: [{ choiceOrWord: "D", trapReason: "Commercial logging is not a funded program." }],
          evidenceQuote: `...allocated to rare species conservation... directly funds regional school education programs.`,
          listeningTechnique: "Track multiple concurrent budget allocations across speech turns.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q15: Gap Fill
        {
          id: 15,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Percentage of revenue reserved for site security overhead:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Site security: ",
          contextAfter: " %",
          acceptedAnswers: [String(secPct)],
          distractors: [{ choiceOrWord: String(conservPct), trapReason: "Conservation share." }],
          evidenceQuote: `The remaining ${secPct} percent of our revenue is reserved strictly for site security...`,
          listeningTechnique: "Extract remaining numerical budget shares.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q16: Gap Fill
        {
          id: 16,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Visitor photography is explicitly permitted throughout all:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Photography permitted in: ",
          acceptedAnswers: [permArea.toLowerCase()],
          distractors: [{ choiceOrWord: chamber.toLowerCase(), trapReason: "Forbidden area." }],
          evidenceQuote: `...personal photography is permitted throughout all ${permArea}.`,
          listeningTechnique: "Identify explicitly authorized public areas.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q17: Gap Fill
        {
          id: 17,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Enclosed room where flashes and tripods are strictly banned:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Banned inside: ",
          acceptedAnswers: [chamber.toLowerCase(), "specimen chamber"],
          distractors: [],
          evidenceQuote: `However, inside the ${chamber}, all camera flashes...`,
          listeningTechnique: "Transcribe facility names with strict prohibitions.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q18: Gap Fill
        {
          id: 18,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Delicate items protected from ultraviolet light degradation:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Protects: ",
          acceptedAnswers: [fragileItem.toLowerCase()],
          distractors: [],
          evidenceQuote: `This strict ban is essential to protect ${fragileItem} from ultraviolet light...`,
          listeningTechnique: "Identify delicate botanical artifacts.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q19: Gap Fill
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Safety device sounded fifteen minutes before gates lock:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Closing alert: ",
          acceptedAnswers: [signal.toLowerCase()],
          distractors: [],
          evidenceQuote: `...staff will sound the ${signal} fifteen minutes before gates lock.`,
          listeningTechnique: "Capture auditory closing signals.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q20: Multiple Choice
        {
          id: 20,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "How much advance notice is given before the estate gates are locked?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) 5 minutes",
            "B) 15 minutes",
            "C) 30 minutes"
          ],
          acceptedAnswers: ["B", "15 minutes", "15"],
          distractors: [{ choiceOrWord: "A", trapReason: "5 minutes is too short." }],
          evidenceQuote: `...fifteen minutes before gates lock.`,
          listeningTechnique: "Identify numerical time intervals for closing procedures.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        }
      ];

      return { audio, questions };
    }
  },

  // 2: Industrial Foundry & Ironworks Museum
  {
    venueTitle: "Ironbridge Heavy Industrial Foundry Museum",
    description: "Senior Site Engineer Malcolm Foster briefs visitors on the foundry's Victorian origins, funding, and foundry hall safety rules.",
    build: (testId, rng) => {
      const year = 1842 + ((testId * 5) % 40);
      const damage = ["boiler explosion", "furnace wall collapse", "shaft flooding"][testId % 3];
      const renoYear = 1991 + ((testId * 2) % 30);
      const conservPct = 52 + ((testId * 3) % 18);
      const eduPct = 28;
      const secPct = 20 - (conservPct - 52);
      const permArea = ["elevated catwalks", "foundry courtyards", "quarry viewing decks"][testId % 3];
      const chamber = "Molten Cast Vault";
      const fragileItem = ["terracotta molds", "wooden patterns", "foundry records"][testId % 3];
      const signal = ["warning bell", "steam whistle", "foundry siren"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to the Ironbridge Heavy Industrial Foundry. I am Malcolm Foster. Our blast furnace facilities were originally built in ${year}.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `Production halted abruptly in the early 20th century following a disastrous ${damage} in the main boiler house.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `After national heritage trusts financed the restoration, our public museum was opened in ${renoYear}.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `Our funding structure dictates that ${conservPct} percent of admissions goes toward heavy machinery conservation.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `In addition, ${eduPct} percent is allocated directly to youth apprentice engineering workshops.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `The remaining ${secPct} percent is earmarked for structural site security.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `Visitors are welcome to take handheld photos along the ${permArea}.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `However, inside the ${chamber}, flash photography and tripods are strictly prohibited.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `This is enforced to protect antique ${fragileItem} from accidental vibration and light shock.` },
        { speaker: "Engineer Foster", speakerRole: 'speaker1', accent: 'en-GB', text: `Before each scheduled molten iron pour, staff will sound the loud ${signal}.` }
      ];

      const questions: Question[] = [
        {
          id: 11,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "In what year were the blast furnace facilities originally erected?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${year + 20}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["A", String(year)],
          distractors: [{ choiceOrWord: "C", trapReason: `Year ${renoYear} is the public museum opening.` }],
          evidenceQuote: `...blast furnace facilities were originally built in ${year}.`,
          listeningTechnique: "Transcribe industrial founding dates.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 12,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What catastrophe abruptly ended historical iron production?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) A severe ${damage}`,
            `B) A sudden workers' strike`,
            `C) An exhaustion of local iron ore`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...following a disastrous ${damage} in the main boiler house.`,
          listeningTechnique: "Identify specific historical industrial disasters.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 13,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When did the restored museum open to the public?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${renoYear}`,
            `C) ${renoYear + 15}`
          ],
          acceptedAnswers: ["B", String(renoYear)],
          distractors: [],
          evidenceQuote: `...our public museum was opened in ${renoYear}.`,
          listeningTechnique: "Isolate museum opening milestones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 14,
          sectionId: 2,
          type: 'multiple_choice_multi',
          prompt: "Which TWO programs are financed by the museum's admission revenue?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            "A) Heavy machinery conservation",
            "B) International corporate bond trade",
            "C) Youth apprentice engineering workshops",
            "D) Overseas coal import subsidies",
            "E) Railway shareholder dividends"
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, C", "AC", "C, A", "CA"],
          distractors: [],
          evidenceQuote: `...toward heavy machinery conservation... allocated directly to youth apprentice engineering workshops.`,
          listeningTechnique: "Extract multi-select educational and preservation initiatives.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 15,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Percentage earmarked for site security:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Site security: ",
          contextAfter: " %",
          acceptedAnswers: [String(secPct)],
          distractors: [],
          evidenceQuote: `The remaining ${secPct} percent is earmarked for structural site security.`,
          listeningTechnique: "Identify residual operational budget percentages.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 16,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Visitor photography is welcomed along the:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Photos allowed along: ",
          acceptedAnswers: [permArea.toLowerCase()],
          distractors: [],
          evidenceQuote: `...take handheld photos along the ${permArea}.`,
          listeningTechnique: "Capture permitted viewing locations.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 17,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Restricted hall where camera tripods are forbidden:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Forbidden inside: ",
          acceptedAnswers: [chamber.toLowerCase(), "cast vault"],
          distractors: [],
          evidenceQuote: `However, inside the ${chamber}, flash photography and tripods are strictly prohibited.`,
          listeningTechnique: "Note names of protected industrial vaults.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 18,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Historic items shielded from vibration and light shock:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Protects: ",
          acceptedAnswers: [fragileItem.toLowerCase()],
          distractors: [],
          evidenceQuote: `...protect antique ${fragileItem} from accidental vibration and light shock.`,
          listeningTechnique: "Identify historic casting artifacts.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Auditory alert sounded prior to pouring molten metal:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Warning: ",
          acceptedAnswers: [signal.toLowerCase()],
          distractors: [],
          evidenceQuote: `...staff will sound the loud ${signal}.`,
          listeningTechnique: "Capture warning acoustic signals.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 20,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What operation triggers the sounding of the safety signal?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) The arrival of museum tour groups",
            "B) Each scheduled molten iron pour",
            "C) Nightly locking of the site gates"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `Before each scheduled molten iron pour, staff will sound the loud ${signal}.`,
          listeningTechnique: "Correlate auditory alerts to hazardous procedures.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        }
      ];

      return { audio, questions };
    }
  },

  // 3: Horological Observatory & Clockwork Archive
  {
    venueTitle: "Royal Horological Observatory & Clockwork Vaults",
    description: "Chief Horologist Alistair Sterling explains the clock tower's history, restoration, and preservation guidelines.",
    build: (testId, rng) => {
      const year = 1868 + ((testId * 4) % 35);
      const damage = ["lightning strike", "clock tower blaze", "counterweight collapse"][testId % 3];
      const renoYear = 1996 + ((testId * 3) % 25);
      const conservPct = 48 + ((testId * 4) % 22);
      const eduPct = 32;
      const secPct = 20 - (conservPct - 48);
      const permArea = ["sundial terraces", "astronomy gardens", "outer courtyards"][testId % 3];
      const chamber = "Master Chronometer Chamber";
      const fragileItem = ["brass escapements", "astronomical dials", "pendulum springs"][testId % 3];
      const signal = ["warning bell", "great chime", "acoustic gong"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to the Royal Horological Observatory. I am Alistair Sterling. The great clockwork tower was commissioned in ${year}.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `The escapements remained frozen for several decades after a devastating ${damage} cracked the upper pendulum housing.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Following extensive public subscription, the clockwork observatory reopened in ${renoYear}.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Now, regarding visitor regulations across our different horological sections:` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `First, the sundial terraces are open to all visitors without any advance booking.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Second, the antique timepiece library requires visitors to reserve a research pass 24 hours in advance.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Third, the master gear assembly vault is strictly restricted to accompanied guided groups only.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `And fourth, the roof astronomy turret is temporarily closed for structural restoration.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `In summary, to access our specialized historical collections, guests must either book ahead or join an accompanied group.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Five minutes before hourly strikes, guards will sound the loud ${signal}.` }
      ];

      const questions: Question[] = [
        {
          id: 11,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "In which year was the great clockwork tower commissioned?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year - 12}`,
            `B) ${year}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["B", String(year)],
          distractors: [{ choiceOrWord: "C", trapReason: `Year ${renoYear} is reopening date.` }],
          evidenceQuote: `...clockwork tower was commissioned in ${year}.`,
          listeningTechnique: "Transcribe horological construction years.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 12,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Physical event that halted the pendulum mechanisms for decades:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Damaged by: ",
          acceptedAnswers: [damage.toLowerCase()],
          distractors: [],
          evidenceQuote: `...after a devastating ${damage} cracked the upper pendulum housing.`,
          listeningTechnique: "Identify mechanical disruption causes.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 13,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When did public visits resume at the observatory?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${renoYear}`,
            `C) ${renoYear + 8}`
          ],
          acceptedAnswers: ["B", String(renoYear)],
          distractors: [],
          evidenceQuote: `...clockwork observatory reopened in ${renoYear}.`,
          listeningTechnique: "Isolate public reopening milestones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q14: Matching
        {
          id: 14,
          sectionId: 2,
          type: 'matching',
          prompt: "Sundial terraces",
          instruction: "What visitor regulation applies to each horological section? Choose the correct letter, A, B, C, or D.",
          options: [
            "A - Open to all visitors without any advance booking",
            "B - Requires a research pass booked 24 hours in advance",
            "C - Restricted to accompanied guided groups only",
            "D - Temporarily closed for structural restoration"
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `First, the sundial terraces are open to all visitors without any advance booking.`,
          listeningTechnique: "Match visitor zones to specific operational regulations.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q15: Matching
        {
          id: 15,
          sectionId: 2,
          type: 'matching',
          prompt: "Antique timepiece library",
          instruction: "What visitor regulation applies to each horological section? Choose the correct letter, A, B, C, or D.",
          options: [
            "A - Open to all visitors without any advance booking",
            "B - Requires a research pass booked 24 hours in advance",
            "C - Restricted to accompanied guided groups only",
            "D - Temporarily closed for structural restoration"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `Second, the antique timepiece library requires visitors to reserve a research pass 24 hours in advance.`,
          listeningTechnique: "Match advance booking conditions to target collections.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q16: Matching
        {
          id: 16,
          sectionId: 2,
          type: 'matching',
          prompt: "Master gear assembly vault",
          instruction: "What visitor regulation applies to each horological section? Choose the correct letter, A, B, C, or D.",
          options: [
            "A - Open to all visitors without any advance booking",
            "B - Requires a research pass booked 24 hours in advance",
            "C - Restricted to accompanied guided groups only",
            "D - Temporarily closed for structural restoration"
          ],
          acceptedAnswers: ["C"],
          distractors: [],
          evidenceQuote: `Third, the master gear assembly vault is strictly restricted to accompanied guided groups only.`,
          listeningTechnique: "Identify guided-only restrictions across exhibition areas.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q17: Matching
        {
          id: 17,
          sectionId: 2,
          type: 'matching',
          prompt: "Roof astronomy turret",
          instruction: "What visitor regulation applies to each horological section? Choose the correct letter, A, B, C, or D.",
          options: [
            "A - Open to all visitors without any advance booking",
            "B - Requires a research pass booked 24 hours in advance",
            "C - Restricted to accompanied guided groups only",
            "D - Temporarily closed for structural restoration"
          ],
          acceptedAnswers: ["D"],
          distractors: [],
          evidenceQuote: `And fourth, the roof astronomy turret is temporarily closed for structural restoration.`,
          listeningTechnique: "Extract temporary closure status across visitor zones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q18: Multiple Choice Multi
        {
          id: 18,
          sectionId: 2,
          type: 'multiple_choice_multi',
          prompt: "Which TWO sections require either an advance pass or an accompanying guide?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            "A) Master gear assembly vault",
            "B) Antique timepiece library",
            "C) Sundial terraces",
            "D) Public gift shop",
            "E) Ground floor restrooms"
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, B", "AB", "B, A", "BA"],
          distractors: [{ choiceOrWord: "C", trapReason: "Sundial terraces are open without booking." }],
          evidenceQuote: `...to access our specialized historical collections, guests must either book ahead or join an accompanied group.`,
          listeningTechnique: "Synthesize multi-criteria access requirements.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q19: Gap Fill
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Auditory signal sounded five minutes before hourly strikes:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Sounded: ",
          acceptedAnswers: [signal.toLowerCase()],
          distractors: [],
          evidenceQuote: `Five minutes before hourly strikes, guards will sound the loud ${signal}.`,
          listeningTechnique: "Capture warning acoustic signals.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q20: Multiple Choice
        {
          id: 20,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "How many minutes prior to the hourly strike is the warning sounded?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) 2 minutes",
            "B) 5 minutes",
            "C) 10 minutes"
          ],
          acceptedAnswers: ["B", "5 minutes", "5"],
          distractors: [],
          evidenceQuote: `Five minutes before hourly strikes, guards will sound the loud ${signal}.`,
          listeningTechnique: "Extract lead time durations before scheduled events.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        }
      ];

      return { audio, questions };
    }
  },

  // 4: Solway Marine Biosphere Reserve
  {
    venueTitle: "Solway Estuary Marine Biosphere & Wetland Sanctuary",
    description: "Sanctuary Warden Clara Evans guides visitors through the biosphere's history, funding allocation, and sensitive wildlife zones.",
    build: (testId, rng) => {
      const year = 1910 + ((testId * 3) % 40);
      const damage = ["severe tidal surge", "storm breach", "saline intrusion"][testId % 3];
      const renoYear = 1995 + ((testId * 4) % 28);
      const conservPct = 55 + ((testId * 2) % 18);
      const eduPct = 25;
      const secPct = 20 - (conservPct - 55);
      const permArea = ["coastal boardwalks", "lookout towers", "outer marsh trails"][testId % 3];
      const chamber = "Nocturnal Heron Sanctuary";
      const fragileItem = ["nesting plumage", "sensitive eggs", "rare wetland moss"][testId % 3];
      const signal = ["tidal horn", "fog warning siren", "harbor bell"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to Solway Estuary Marine Biosphere. I am Clara Evans, senior warden. The reserve lands were officially established in ${year}.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `The original observation huts were destroyed when a ${damage} inundated the freshwater wetlands.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `Following extensive engineering of new sea dykes, the modern eco-pavilion opened in ${renoYear}.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `Today, ${conservPct} percent of admissions revenue funds saltmarsh habitat restoration.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `A further ${eduPct} percent supports school biodiversity field excursions.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `The remaining ${secPct} percent maintains our marine patrol craft.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `Visitors are encouraged to use cameras and binoculars along the ${permArea}.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `However, within the ${chamber}, artificial lighting and tripods are strictly banned.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `This prevents disrupting the birds' ${fragileItem} during breeding season.` },
        { speaker: "Warden Clara", speakerRole: 'speaker1', accent: 'en-GB', text: `Before fast incoming tides cover the low causeway, wardens will sound the ${signal}.` }
      ];

      const questions: Question[] = [
        {
          id: 11,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When were the reserve lands officially established?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year - 20}`,
            `B) ${year}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["B", String(year)],
          distractors: [{ choiceOrWord: "C", trapReason: `Year ${renoYear} is modern eco-pavilion opening.` }],
          evidenceQuote: `...reserve lands were officially established in ${year}.`,
          listeningTechnique: "Extract historical sanctuary founding dates.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 12,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What environmental catastrophe destroyed the original observation huts?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) A ${damage}`,
            `B) A sudden peat wildfire`,
            `C) A coastal mudslide`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...destroyed when a ${damage} inundated the freshwater wetlands.`,
          listeningTechnique: "Identify causes of wetland habitat destruction.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 13,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When was the modern eco-pavilion unveiled?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${renoYear}`,
            `C) ${renoYear + 12}`
          ],
          acceptedAnswers: ["B", String(renoYear)],
          distractors: [],
          evidenceQuote: `...modern eco-pavilion opened in ${renoYear}.`,
          listeningTechnique: "Isolate modern facility unveiling milestones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 14,
          sectionId: 2,
          type: 'multiple_choice_multi',
          prompt: "Which TWO causes are financed by the sanctuary's admission revenue?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            "A) Saltmarsh habitat restoration",
            "B) Offshore oil drilling permits",
            "C) School biodiversity field excursions",
            "D) Commercial fisheries expansion",
            "E) Luxury yacht harbor dredging"
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, C", "AC", "C, A", "CA"],
          distractors: [],
          evidenceQuote: `...funds saltmarsh habitat restoration... supports school biodiversity field excursions.`,
          listeningTechnique: "Track multiple concurrent ecological allocations.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 15,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Percentage maintaining marine patrol craft:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Patrol craft: ",
          contextAfter: " %",
          acceptedAnswers: [String(secPct)],
          distractors: [],
          evidenceQuote: `The remaining ${secPct} percent maintains our marine patrol craft.`,
          listeningTechnique: "Identify patrol craft operational budget shares.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 16,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Boardwalk where cameras and binoculars are encouraged:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Cameras welcomed on: ",
          acceptedAnswers: [permArea.toLowerCase()],
          distractors: [],
          evidenceQuote: `...cameras and binoculars along the ${permArea}.`,
          listeningTechnique: "Capture unrestricted visitor walkways.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 17,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Restricted zone where artificial lighting is banned:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Banned within: ",
          acceptedAnswers: [chamber.toLowerCase(), "heron sanctuary"],
          distractors: [],
          evidenceQuote: `However, within the ${chamber}, artificial lighting and tripods are strictly banned.`,
          listeningTechnique: "Note names of sensitive animal zones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 18,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Wildlife feature protected during breeding season:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Protects birds' ",
          acceptedAnswers: [fragileItem.toLowerCase()],
          distractors: [],
          evidenceQuote: `This prevents disrupting the birds' ${fragileItem} during breeding season.`,
          listeningTechnique: "Identify vulnerable avian features.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Warning signal sounded before tidal inundation:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Sounded: ",
          acceptedAnswers: [signal.toLowerCase()],
          distractors: [],
          evidenceQuote: `...wardens will sound the ${signal}.`,
          listeningTechnique: "Capture maritime warning signals.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 20,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What environmental hazard causes wardens to sound the alarm signal?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) Severe gale force winds",
            "B) Fast incoming tides covering the low causeway",
            "C) Wild predator sightings"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `Before fast incoming tides cover the low causeway, wardens will sound the ${signal}.`,
          listeningTechnique: "Correlate auditory warnings with coastal tidal hazards.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        }
      ];

      return { audio, questions };
    }
  },

  // 5: Roman Villa Archaeological Pavilion
  {
    venueTitle: "Chedworth Roman Villa & Mosaic Pavilion",
    description: "Lead Archaeologist Dr. Marcus Higgins outlines the villa excavation, preservation endowment, and visitor guidelines.",
    build: (testId, rng) => {
      const year = 1864 + ((testId * 6) % 38);
      const damage = ["severe ground frost", "riverbank erosion", "uncontrolled trench collapse"][testId % 3];
      const renoYear = 1999 + ((testId * 2) % 24);
      const conservPct = 51 + ((testId * 3) % 21);
      const eduPct = 29;
      const secPct = 20 - (conservPct - 51);
      const permArea = ["courtyard peristyles", "exterior columbarium", "gravel paths"][testId % 3];
      const chamber = "Hypocaust Bath Chamber";
      const fragileItem = ["wall frescoes", "limestone tesserae", "plaster pigments"][testId % 3];
      const signal = ["warning buzzer", "closing chime", "patrol bell"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to Chedworth Roman Villa. I am Dr. Marcus Higgins. Please refer to the plan of the excavated villa complex on your screens.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `We are standing here at the South Entrance. If you walk along the western portico towards the bathhouse, location A is the Hypocaust Bath Chamber.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Directly opposite on the eastern courtyard wing, location B marks the Great Mosaic Dining Room.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `At the central courtyard garden, location C is the Nymphaeum Sacred Spring.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `And at the northern perimeter beyond the stone wall, location D is our Active Excavation Workstation.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Regarding our history: the initial Roman ruins were uncovered in ${year}.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Early preservation efforts suffered when ${damage} compromised the uncovered bathhouse stonework.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Our new climate-controlled mosaic pavilion was unveiled to visitors in ${renoYear}.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Under our heritage agreement, ${conservPct} percent of gate receipts is invested in mosaic conservation.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Ten minutes before the gates are secured, staff activate the ${signal}.` }
      ];

      const villaMapData = {
        title: "Chedworth Roman Villa Excavation Site",
        subtitle: "Ground Plan & Visitor Route",
        locations: [
          { letter: 'A', name: 'Hypocaust Bath Chamber', x: 26, y: 38 },
          { letter: 'B', name: 'Great Mosaic Dining Room', x: 74, y: 38 },
          { letter: 'C', name: 'Nymphaeum Sacred Spring', x: 50, y: 56 },
          { letter: 'D', name: 'Active Excavation Workstation', x: 50, y: 18 }
        ]
      };

      const questions: Question[] = [
        // Q11: Map Labelling
        {
          id: 11,
          sectionId: 2,
          type: 'map_labelling',
          prompt: "Hypocaust Bath Chamber",
          instruction: "Label the plan below. Choose the correct letter, A–D.",
          mapData: villaMapData,
          options: ["Location A", "Location B", "Location C", "Location D"],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...location A is the Hypocaust Bath Chamber.`,
          listeningTechnique: "Follow cardinal and spatial directions on the architectural plan.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q12: Map Labelling
        {
          id: 12,
          sectionId: 2,
          type: 'map_labelling',
          prompt: "Great Mosaic Dining Room",
          instruction: "Label the plan below. Choose the correct letter, A–D.",
          mapData: villaMapData,
          options: ["Location A", "Location B", "Location C", "Location D"],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `...location B marks the Great Mosaic Dining Room.`,
          listeningTechnique: "Track opposing courtyard wing locations on the layout.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q13: Map Labelling
        {
          id: 13,
          sectionId: 2,
          type: 'map_labelling',
          prompt: "Nymphaeum Sacred Spring",
          instruction: "Label the plan below. Choose the correct letter, A–D.",
          mapData: villaMapData,
          options: ["Location A", "Location B", "Location C", "Location D"],
          acceptedAnswers: ["C"],
          distractors: [],
          evidenceQuote: `...location C is the Nymphaeum Sacred Spring.`,
          listeningTechnique: "Locate central courtyard water features on the diagram.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q14: Map Labelling
        {
          id: 14,
          sectionId: 2,
          type: 'map_labelling',
          prompt: "Active Excavation Workstation",
          instruction: "Label the plan below. Choose the correct letter, A–D.",
          mapData: villaMapData,
          options: ["Location A", "Location B", "Location C", "Location D"],
          acceptedAnswers: ["D"],
          distractors: [],
          evidenceQuote: `...location D is our Active Excavation Workstation.`,
          listeningTechnique: "Identify northern perimeter archaeological dig zones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q15: Multiple Choice
        {
          id: 15,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "In what year were the Roman ruins initially uncovered?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year - 14}`,
            `B) ${year}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["B", String(year)],
          distractors: [{ choiceOrWord: "C", trapReason: `Year ${renoYear} is modern pavilion unveiling.` }],
          evidenceQuote: `...initial Roman ruins were uncovered in ${year}.`,
          listeningTechnique: "Transcribe archaeological discovery dates.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q16: Gap Fill
        {
          id: 16,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Environmental damage that compromised early bathhouse stonework:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Damaged by: ",
          acceptedAnswers: [damage.toLowerCase()],
          distractors: [],
          evidenceQuote: `...suffered when ${damage} compromised the uncovered bathhouse stonework.`,
          listeningTechnique: "Identify physical causes of stone degradation.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q17: Multiple Choice
        {
          id: 17,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When was the climate-controlled mosaic pavilion unveiled to visitors?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${renoYear}`,
            `C) ${renoYear + 6}`
          ],
          acceptedAnswers: ["B", String(renoYear)],
          distractors: [],
          evidenceQuote: `...mosaic pavilion was unveiled to visitors in ${renoYear}.`,
          listeningTechnique: "Isolate modern pavilion opening milestones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q18: Multiple Choice
        {
          id: 18,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What percentage of gate receipts is invested directly in mosaic conservation?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${conservPct}%`,
            `B) ${conservPct - 15}%`,
            `C) 80%`
          ],
          acceptedAnswers: ["A", `${conservPct}%`, String(conservPct)],
          distractors: [],
          evidenceQuote: `Under our heritage agreement, ${conservPct} percent of gate receipts is invested in mosaic conservation.`,
          listeningTechnique: "Capture conservation budget proportions.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q19: Gap Fill
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Signal activated ten minutes before gate closure:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Closing signal: ",
          acceptedAnswers: [signal.toLowerCase()],
          distractors: [],
          evidenceQuote: `...staff activate the ${signal}.`,
          listeningTechnique: "Identify closing alerts.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        // Q20: Multiple Choice
        {
          id: 20,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "How long before gates are secured is the alert activated?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) 5 minutes",
            "B) 10 minutes",
            "C) 20 minutes"
          ],
          acceptedAnswers: ["B", "10", "10 minutes"],
          distractors: [],
          evidenceQuote: `Ten minutes before the gates are secured, staff activate the ${signal}.`,
          listeningTechnique: "Capture lead time minutes before closing.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        }
      ];

      return { audio, questions };
    }
  },

  // 6: Aeronautical Hangar & Supersonic Heritage Centre
  {
    venueTitle: "Cotswold Aeronautical Hangar & Supersonic Heritage Centre",
    description: "Museum Director Air Commodore David Thorne briefs visitors on the airfield's origins, aviation preservation, and safety zones.",
    build: (testId, rng) => {
      const year = 1939 + ((testId * 4) % 30);
      const damage = ["hangar roof fire", "fuel storage blaze", "runway subsidence"][testId % 3];
      const renoYear = 1998 + ((testId * 3) % 26);
      const conservPct = 53 + ((testId * 3) % 19);
      const eduPct = 27;
      const secPct = 20 - (conservPct - 53);
      const permArea = ["outdoor flightlines", "tarmac ramps", "control tower lawns"][testId % 3];
      const chamber = "Prototype Cockpit Enclosure";
      const fragileItem = ["avionics gyroscopes", "altimeter glass", "radar dials"][testId % 3];
      const signal = ["airfield klaxon", "emergency siren", "warning buzzer"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to the Supersonic Aviation Heritage Centre. I am David Thorne. This military airfield was first commissioned in ${year}.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `Post-war testing halted temporarily after a damaging ${damage} in the main workshop wing.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `Following extensive redevelopment of the supersonic hangars, public exhibitions commenced in ${renoYear}.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `Currently, ${conservPct} percent of ticket admissions goes directly to airframe conservation.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `An additional ${eduPct} percent funds school STEM aeronautics workshops.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `The remaining ${secPct} percent finances perimeter security and fire safety.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `Photography is unrestricted across all ${permArea}.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `However, entering the ${chamber} requires visitor flash cameras to be switched off.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `This precaution protects delicate ${fragileItem} from electrostatic and light damage.` },
        { speaker: "Director Thorne", speakerRole: 'speaker1', accent: 'en-GB', text: `Whenever aircraft ground engines are run, safety marshals sound the loud ${signal}.` }
      ];

      const questions: Question[] = [
        {
          id: 11,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "In what year was the military airfield first commissioned?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year - 10}`,
            `B) ${year}`,
            `C) ${renoYear}`
          ],
          acceptedAnswers: ["B", String(year)],
          distractors: [{ choiceOrWord: "C", trapReason: `Year ${renoYear} is public exhibitions date.` }],
          evidenceQuote: `...military airfield was first commissioned in ${year}.`,
          listeningTechnique: "Transcribe airfield commissioning years.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 12,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What accident temporarily halted post-war flight testing?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) A damaging ${damage}`,
            `B) A mid-air aircraft collision`,
            `C) A sudden pilot strike`
          ],
          acceptedAnswers: ["A"],
          distractors: [],
          evidenceQuote: `...halted temporarily after a damaging ${damage} in the main workshop wing.`,
          listeningTechnique: "Identify causes of military airfield testing interruptions.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 13,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When did public supersonic exhibitions commence?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            `A) ${year}`,
            `B) ${renoYear}`,
            `C) ${renoYear + 10}`
          ],
          acceptedAnswers: ["B", String(renoYear)],
          distractors: [],
          evidenceQuote: `...public exhibitions commenced in ${renoYear}.`,
          listeningTechnique: "Isolate public museum opening milestones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 14,
          sectionId: 2,
          type: 'multiple_choice_multi',
          prompt: "Which TWO areas are financed by the heritage centre's ticket admissions?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            "A) Airframe conservation",
            "B) Private pilot luxury holidays",
            "C) School STEM aeronautics workshops",
            "D) Overseas weapon exports",
            "E) Commercial passenger airline subsidies"
          ],
          maxSelectable: 2,
          acceptedAnswers: ["A, C", "AC", "C, A", "CA"],
          distractors: [],
          evidenceQuote: `...goes directly to airframe conservation... funds school STEM aeronautics workshops.`,
          listeningTechnique: "Extract multi-select educational and aircraft preservation programs.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 15,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Percentage financing perimeter security and fire safety:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Perimeter security: ",
          contextAfter: " %",
          acceptedAnswers: [String(secPct)],
          distractors: [],
          evidenceQuote: `The remaining ${secPct} percent finances perimeter security and fire safety.`,
          listeningTechnique: "Extract perimeter safety percentages.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 16,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Area where photography is unrestricted:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Unrestricted on: ",
          acceptedAnswers: [permArea.toLowerCase()],
          distractors: [],
          evidenceQuote: `Photography is unrestricted across all ${permArea}.`,
          listeningTechnique: "Identify unrestricted open airfield zones.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 17,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Restricted enclosure where flash cameras must be switched off:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Flash off in: ",
          acceptedAnswers: [chamber.toLowerCase(), "cockpit enclosure"],
          distractors: [],
          evidenceQuote: `However, entering the ${chamber} requires visitor flash cameras to be switched off.`,
          listeningTechnique: "Transcribe aircraft enclosure names.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 18,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Delicate instruments shielded from electrostatic and light damage:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Shields: ",
          acceptedAnswers: [fragileItem.toLowerCase()],
          distractors: [],
          evidenceQuote: `This precaution protects delicate ${fragileItem} from electrostatic...`,
          listeningTechnique: "Identify sensitive avionics devices.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Auditory signal sounded during engine ground tests:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Sounded: ",
          acceptedAnswers: [signal.toLowerCase()],
          distractors: [],
          evidenceQuote: `...safety marshals sound the loud ${signal}.`,
          listeningTechnique: "Capture airfield safety warning signals.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        },
        {
          id: 20,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "What ground activity triggers the airfield warning signal?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) The opening of the main hangar doors",
            "B) Whenever aircraft ground engines are run",
            "C) Emergency runway maintenance"
          ],
          acceptedAnswers: ["B"],
          distractors: [],
          evidenceQuote: `Whenever aircraft ground engines are run, safety marshals sound the loud ${signal}.`,
          listeningTechnique: "Correlate auditory alerts to hazardous engine testing procedures.",
          difficultyProfile: generateDifficultyProfile(rng, 2)
        }
      ];

      return { audio, questions };
    }
  }
];

export function generateProceduralSection2(testId: number, rng: () => number): Section {
  const archIndex = (testId * 5) % S2_ARCHETYPES.length;
  const arch = S2_ARCHETYPES[archIndex];
  const { audio, questions } = arch.build(testId, rng);

  return {
    sectionNumber: 2,
    title: `Section 2: ${arch.venueTitle}`,
    description: arch.description,
    contextType: 'social_monologue',
    audioScript: audio,
    questions
  };
}
