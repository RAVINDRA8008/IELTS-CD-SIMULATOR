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
        { id: 11, sectionId: 2, type: 'gap_fill', prompt: "Year the arboretum grounds were originally founded:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Founded: ", acceptedAnswers: [String(year)], distractors: [{ choiceOrWord: String(renoYear), trapReason: "Modern reopening milestone." }], evidenceQuote: `...estate grounds were officially founded in ${year}.`, listeningTechnique: "Capture initial founding dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 12, sectionId: 2, type: 'gap_fill', prompt: "Historical physical issue causing prolonged closure:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Closed due to: ", acceptedAnswers: [damage.toLowerCase()], distractors: [], evidenceQuote: `...following extensive ${damage}...`, listeningTechnique: "Identify physical causes of closure.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 13, sectionId: 2, type: 'gap_fill', prompt: "Year the arboretum officially reopened to the public:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Reopened: ", acceptedAnswers: [String(renoYear)], distractors: [{ choiceOrWord: String(year), trapReason: "Original founding date." }], evidenceQuote: `...official public reopening was celebrated in ${renoYear}.`, listeningTechnique: "Distinguish reopening from founding.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 14, sectionId: 2, type: 'gap_fill', prompt: "Percentage of admissions allocated to species conservation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Conservation: ", contextAfter: " %", acceptedAnswers: [String(conservPct)], distractors: [{ choiceOrWord: String(eduPct), trapReason: "Education share." }], evidenceQuote: `Today, exactly ${conservPct} percent of all ticket admissions...`, listeningTechnique: "Map precise statistics to designated programs.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 15, sectionId: 2, type: 'gap_fill', prompt: "Percentage allocated directly to school education:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Education: ", contextAfter: " %", acceptedAnswers: [String(eduPct), "thirty"], distractors: [{ choiceOrWord: String(conservPct), trapReason: "Conservation share." }], evidenceQuote: `Meanwhile, a further ${eduPct} percent directly funds...`, listeningTechnique: "Track secondary budgetary allocations.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 16, sectionId: 2, type: 'gap_fill', prompt: "Percentage reserved for site security overhead:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Security: ", contextAfter: " %", acceptedAnswers: [String(secPct)], distractors: [], evidenceQuote: `The remaining ${secPct} percent of our revenue...`, listeningTechnique: "Capture residual percentages.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 17, sectionId: 2, type: 'gap_fill', prompt: "Area where photography is explicitly allowed:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Permitted in: ", acceptedAnswers: [permArea.toLowerCase()], distractors: [], evidenceQuote: `...photography is permitted throughout all ${permArea}.`, listeningTechnique: "Note zones where regulations are permissive.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 18, sectionId: 2, type: 'gap_fill', prompt: "Enclosed room where flashes and tripods are banned:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Banned inside: ", acceptedAnswers: [chamber.toLowerCase(), "specimen chamber"], distractors: [], evidenceQuote: `However, inside the ${chamber}...`, listeningTechnique: "Capture restricted facility names.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 19, sectionId: 2, type: 'gap_fill', prompt: "Vulnerable items protected from light degradation:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Protects: ", acceptedAnswers: [fragileItem.toLowerCase()], distractors: [], evidenceQuote: `...essential to protect ${fragileItem} from ultraviolet light...`, listeningTechnique: "Identify sensitive artifacts.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 20, sectionId: 2, type: 'gap_fill', prompt: "Safety signal sounded before gate closure:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Warning: ", acceptedAnswers: [signal.toLowerCase()], distractors: [], evidenceQuote: `...staff will sound the ${signal} fifteen minutes before gates lock.`, listeningTechnique: "Capture auditory alerts.", difficultyProfile: generateDifficultyProfile(rng, 2) }
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
        { id: 11, sectionId: 2, type: 'gap_fill', prompt: "Year the blast furnace was originally built:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Built: ", acceptedAnswers: [String(year)], distractors: [{ choiceOrWord: String(renoYear), trapReason: "Modern museum opening date." }], evidenceQuote: `...blast furnace facilities were originally built in ${year}.`, listeningTechnique: "Transcribe industrial founding dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 12, sectionId: 2, type: 'gap_fill', prompt: "Disaster causing sudden production stoppage:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Halted by: ", acceptedAnswers: [damage.toLowerCase()], distractors: [], evidenceQuote: `...following a disastrous ${damage}...`, listeningTechnique: "Identify industrial accident causes.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 13, sectionId: 2, type: 'gap_fill', prompt: "Year the foundry museum opened to the public:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Opened: ", acceptedAnswers: [String(renoYear)], distractors: [{ choiceOrWord: String(year), trapReason: "Original construction year." }], evidenceQuote: `...our public museum was opened in ${renoYear}.`, listeningTechnique: "Extract museum opening dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 14, sectionId: 2, type: 'gap_fill', prompt: "Percentage assigned to heavy machinery conservation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Conservation: ", contextAfter: " %", acceptedAnswers: [String(conservPct)], distractors: [{ choiceOrWord: String(eduPct), trapReason: "Apprentice workshops." }], evidenceQuote: `...${conservPct} percent of admissions goes toward heavy machinery conservation.`, listeningTechnique: "Map percentage shares to mechanical preservation.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 15, sectionId: 2, type: 'gap_fill', prompt: "Percentage supporting youth apprentice workshops:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Apprentice workshops: ", contextAfter: " %", acceptedAnswers: [String(eduPct), "twenty-eight"], distractors: [], evidenceQuote: `In addition, ${eduPct} percent is allocated directly to youth apprentice...`, listeningTechnique: "Capture secondary vocational figures.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 16, sectionId: 2, type: 'gap_fill', prompt: "Percentage earmarked for site security:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Security: ", contextAfter: " %", acceptedAnswers: [String(secPct)], distractors: [], evidenceQuote: `The remaining ${secPct} percent is earmarked for...`, listeningTechnique: "Identify residual security budgets.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 17, sectionId: 2, type: 'gap_fill', prompt: "Elevated path where visitor photos are permitted:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Permitted along: ", acceptedAnswers: [permArea.toLowerCase()], distractors: [], evidenceQuote: `...photos along the ${permArea}.`, listeningTechnique: "Capture permitted public walking structures.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 18, sectionId: 2, type: 'gap_fill', prompt: "Restricted hall where camera equipment is banned:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Forbidden inside: ", acceptedAnswers: [chamber.toLowerCase(), "cast vault"], distractors: [], evidenceQuote: `However, inside the ${chamber}...`, listeningTechnique: "Note names of restricted foundry rooms.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 19, sectionId: 2, type: 'gap_fill', prompt: "Historic artifacts protected from vibration and shock:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Protects: ", acceptedAnswers: [fragileItem.toLowerCase()], distractors: [], evidenceQuote: `...protect antique ${fragileItem} from accidental vibration...`, listeningTechnique: "Identify sensitive manufacturing molds.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 20, sectionId: 2, type: 'gap_fill', prompt: "Warning device sounded prior to molten metal pours:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Warning: ", acceptedAnswers: [signal.toLowerCase()], distractors: [], evidenceQuote: `...staff will sound the loud ${signal}.`, listeningTechnique: "Capture industrial warning signals.", difficultyProfile: generateDifficultyProfile(rng, 2) }
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
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Under our charter, ${conservPct} percent of admissions maintains antique timepiece mechanisms.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Furthermore, ${eduPct} percent supports secondary school astronomy workshops.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `The remaining ${secPct} percent covers the digital security network.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Visitors are encouraged to take photographs across the open ${permArea}.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `In contrast, entering the ${chamber} requires all flash and tripod gear to be checked into lockers.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `We enforce this rule strictly to protect fragile ${fragileItem} from accidental impact and light bursts.` },
        { speaker: "Horologist Sterling", speakerRole: 'speaker1', accent: 'en-GB', text: `Five minutes before hourly strikes, guards will sound the ${signal}.` }
      ];

      const questions: Question[] = [
        { id: 11, sectionId: 2, type: 'gap_fill', prompt: "Year the great clockwork tower was commissioned:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Commissioned: ", acceptedAnswers: [String(year)], distractors: [{ choiceOrWord: String(renoYear), trapReason: "Modern reopening date." }], evidenceQuote: `...clockwork tower was commissioned in ${year}.`, listeningTechnique: "Capture horological founding years.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 12, sectionId: 2, type: 'gap_fill', prompt: "Catastrophic event cracking the pendulum housing:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Damaged by: ", acceptedAnswers: [damage.toLowerCase()], distractors: [], evidenceQuote: `...after a devastating ${damage}...`, listeningTechnique: "Identify physical disruption causes.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 13, sectionId: 2, type: 'gap_fill', prompt: "Year the observatory reopened to the public:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Reopened: ", acceptedAnswers: [String(renoYear)], distractors: [{ choiceOrWord: String(year), trapReason: "Commissioning date." }], evidenceQuote: `...observatory reopened in ${renoYear}.`, listeningTechnique: "Distinguish modern reopening from construction.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 14, sectionId: 2, type: 'gap_fill', prompt: "Percentage funding antique timepiece conservation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Conservation: ", contextAfter: " %", acceptedAnswers: [String(conservPct)], distractors: [{ choiceOrWord: String(eduPct), trapReason: "School astronomy share." }], evidenceQuote: `...${conservPct} percent of admissions maintains antique timepiece mechanisms.`, listeningTechnique: "Map expenditure shares accurately.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 15, sectionId: 2, type: 'gap_fill', prompt: "Percentage dedicated to school astronomy workshops:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Astronomy workshops: ", contextAfter: " %", acceptedAnswers: [String(eduPct), "thirty-two"], distractors: [], evidenceQuote: `Furthermore, ${eduPct} percent supports secondary school...`, listeningTechnique: "Extract educational shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 16, sectionId: 2, type: 'gap_fill', prompt: "Percentage allocated to the digital security network:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Security: ", contextAfter: " %", acceptedAnswers: [String(secPct)], distractors: [], evidenceQuote: `The remaining ${secPct} percent covers the digital security network.`, listeningTechnique: "Identify residual security budgets.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 17, sectionId: 2, type: 'gap_fill', prompt: "Terrace where visitor photography is welcomed:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Permitted across: ", acceptedAnswers: [permArea.toLowerCase()], distractors: [], evidenceQuote: `...photographs across the open ${permArea}.`, listeningTechnique: "Capture unrestricted visitor areas.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 18, sectionId: 2, type: 'gap_fill', prompt: "Restricted room where tripods must be stored away:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Restricted room: ", acceptedAnswers: [chamber.toLowerCase(), "chronometer chamber"], distractors: [], evidenceQuote: `In contrast, entering the ${chamber}...`, listeningTechnique: "Transcribe protected chamber titles.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 19, sectionId: 2, type: 'gap_fill', prompt: "Delicate mechanisms shielded from light and shock:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Shields: ", acceptedAnswers: [fragileItem.toLowerCase()], distractors: [], evidenceQuote: `...protect fragile ${fragileItem} from accidental impact...`, listeningTechnique: "Identify clockwork mechanisms.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 20, sectionId: 2, type: 'gap_fill', prompt: "Warning signal sounded prior to hourly strikes:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Sounded: ", acceptedAnswers: [signal.toLowerCase()], distractors: [], evidenceQuote: `...guards will sound the ${signal}.`, listeningTechnique: "Capture audio warning signals.", difficultyProfile: generateDifficultyProfile(rng, 2) }
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
        { id: 11, sectionId: 2, type: 'gap_fill', prompt: "Year the biosphere reserve was established:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Established: ", acceptedAnswers: [String(year)], distractors: [{ choiceOrWord: String(renoYear), trapReason: "Eco-pavilion opening date." }], evidenceQuote: `...reserve lands were officially established in ${year}.`, listeningTechnique: "Capture reserve establishment dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 12, sectionId: 2, type: 'gap_fill', prompt: "Severe weather event inundating freshwater wetlands:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Destroyed by: ", acceptedAnswers: [damage.toLowerCase()], distractors: [], evidenceQuote: `...destroyed when a ${damage} inundated...`, listeningTechnique: "Identify coastal weather events.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 13, sectionId: 2, type: 'gap_fill', prompt: "Year the modern eco-pavilion opened:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Opened: ", acceptedAnswers: [String(renoYear)], distractors: [{ choiceOrWord: String(year), trapReason: "Establishment year." }], evidenceQuote: `...the modern eco-pavilion opened in ${renoYear}.`, listeningTechnique: "Isolate modern facility dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 14, sectionId: 2, type: 'gap_fill', prompt: "Percentage funding saltmarsh habitat restoration:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Restoration: ", contextAfter: " %", acceptedAnswers: [String(conservPct)], distractors: [{ choiceOrWord: String(eduPct), trapReason: "School excursions." }], evidenceQuote: `Today, ${conservPct} percent of admissions revenue funds...`, listeningTechnique: "Capture ecological funding shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 15, sectionId: 2, type: 'gap_fill', prompt: "Percentage supporting school biodiversity excursions:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "School excursions: ", contextAfter: " %", acceptedAnswers: [String(eduPct), "twenty-five"], distractors: [], evidenceQuote: `A further ${eduPct} percent supports school...`, listeningTechnique: "Extract educational shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 16, sectionId: 2, type: 'gap_fill', prompt: "Percentage funding marine patrol craft maintenance:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Patrol craft: ", contextAfter: " %", acceptedAnswers: [String(secPct)], distractors: [], evidenceQuote: `The remaining ${secPct} percent maintains our marine patrol craft.`, listeningTechnique: "Capture patrol craft shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 17, sectionId: 2, type: 'gap_fill', prompt: "Walkway where visitor cameras are encouraged:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Allowed along: ", acceptedAnswers: [permArea.toLowerCase()], distractors: [], evidenceQuote: `...cameras and binoculars along the ${permArea}.`, listeningTechnique: "Capture visitor trail names.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 18, sectionId: 2, type: 'gap_fill', prompt: "Sanctuary zone where artificial lighting is banned:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Banned within: ", acceptedAnswers: [chamber.toLowerCase(), "heron sanctuary"], distractors: [], evidenceQuote: `However, within the ${chamber}...`, listeningTechnique: "Transcribe protected avian sanctuaries.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 19, sectionId: 2, type: 'gap_fill', prompt: "Avian feature protected during breeding season:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Protects: ", acceptedAnswers: [fragileItem.toLowerCase()], distractors: [], evidenceQuote: `This prevents disrupting the birds' ${fragileItem}...`, listeningTechnique: "Identify sensitive ecological features.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 20, sectionId: 2, type: 'gap_fill', prompt: "Signal alerting visitors to rapid incoming tides:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Tidal alert: ", acceptedAnswers: [signal.toLowerCase()], distractors: [], evidenceQuote: `...wardens will sound the ${signal}.`, listeningTechnique: "Extract maritime warning systems.", difficultyProfile: generateDifficultyProfile(rng, 2) }
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
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome to Chedworth Roman Villa. I am Dr. Marcus Higgins. The initial Roman ruins were uncovered in ${year}.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Early preservation efforts suffered when ${damage} compromised the uncovered bathhouse stonework.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Our new climate-controlled mosaic pavilion was unveiled to visitors in ${renoYear}.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Under our heritage agreement, ${conservPct} percent of gate receipts is invested in mosaic conservation.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Another ${eduPct} percent supports university archaeological student fieldwork.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `The remaining ${secPct} percent funds climate sensors and site security.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Visitors may take pictures anywhere across the ${permArea}.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `However, within the ${chamber}, flash photography is forbidden.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `This protects our delicate 4th-century ${fragileItem} from pigment fading.` },
        { speaker: "Dr. Higgins", speakerRole: 'speaker1', accent: 'en-GB', text: `Ten minutes before the gates are secured, staff activate the ${signal}.` }
      ];

      const questions: Question[] = [
        { id: 11, sectionId: 2, type: 'gap_fill', prompt: "Year the Roman ruins were initially uncovered:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Uncovered: ", acceptedAnswers: [String(year)], distractors: [{ choiceOrWord: String(renoYear), trapReason: "Modern pavilion unveiling." }], evidenceQuote: `...initial Roman ruins were uncovered in ${year}.`, listeningTechnique: "Capture archaeological discovery dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 12, sectionId: 2, type: 'gap_fill', prompt: "Environmental damage compromising the uncovered stonework:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Compromised by: ", acceptedAnswers: [damage.toLowerCase()], distractors: [], evidenceQuote: `...suffered when ${damage} compromised...`, listeningTechnique: "Identify physical weathering causes.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 13, sectionId: 2, type: 'gap_fill', prompt: "Year the modern mosaic pavilion was unveiled:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Unveiled: ", acceptedAnswers: [String(renoYear)], distractors: [{ choiceOrWord: String(year), trapReason: "Discovery year." }], evidenceQuote: `...mosaic pavilion was unveiled to visitors in ${renoYear}.`, listeningTechnique: "Extract modern pavilion dates.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 14, sectionId: 2, type: 'gap_fill', prompt: "Percentage invested into mosaic conservation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Conservation: ", contextAfter: " %", acceptedAnswers: [String(conservPct)], distractors: [{ choiceOrWord: String(eduPct), trapReason: "Student fieldwork." }], evidenceQuote: `...${conservPct} percent of gate receipts is invested in mosaic conservation.`, listeningTechnique: "Capture mosaic conservation shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 15, sectionId: 2, type: 'gap_fill', prompt: "Percentage supporting university archaeological fieldwork:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Fieldwork: ", contextAfter: " %", acceptedAnswers: [String(eduPct), "twenty-nine"], distractors: [], evidenceQuote: `Another ${eduPct} percent supports university archaeological...`, listeningTechnique: "Extract educational shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 16, sectionId: 2, type: 'gap_fill', prompt: "Percentage allocated to sensors and site security:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Security: ", contextAfter: " %", acceptedAnswers: [String(secPct)], distractors: [], evidenceQuote: `The remaining ${secPct} percent funds climate sensors and site security.`, listeningTechnique: "Identify security shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 17, sectionId: 2, type: 'gap_fill', prompt: "Area where photography is unrestricted:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Allowed across: ", acceptedAnswers: [permArea.toLowerCase()], distractors: [], evidenceQuote: `...pictures anywhere across the ${permArea}.`, listeningTechnique: "Capture unrestricted courtyard features.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 18, sectionId: 2, type: 'gap_fill', prompt: "Chamber where flash photography is forbidden:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Forbidden in: ", acceptedAnswers: [chamber.toLowerCase(), "bath chamber"], distractors: [], evidenceQuote: `However, within the ${chamber}...`, listeningTechnique: "Transcribe Roman bathhouse names.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 19, sectionId: 2, type: 'gap_fill', prompt: "Delicate historical artifacts protected from fading:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Protects: ", acceptedAnswers: [fragileItem.toLowerCase()], distractors: [], evidenceQuote: `This protects our delicate 4th-century ${fragileItem}...`, listeningTechnique: "Identify delicate pigments and frescos.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 20, sectionId: 2, type: 'gap_fill', prompt: "Alert signal sounded before closing gates:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Closing alert: ", acceptedAnswers: [signal.toLowerCase()], distractors: [], evidenceQuote: `...staff activate the ${signal}.`, listeningTechnique: "Identify closing alerts.", difficultyProfile: generateDifficultyProfile(rng, 2) }
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
        { id: 11, sectionId: 2, type: 'gap_fill', prompt: "Year the military airfield was commissioned:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Commissioned: ", acceptedAnswers: [String(year)], distractors: [{ choiceOrWord: String(renoYear), trapReason: "Public exhibitions date." }], evidenceQuote: `...military airfield was first commissioned in ${year}.`, listeningTechnique: "Transcribe military commissioning years.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 12, sectionId: 2, type: 'gap_fill', prompt: "Accident halting post-war aircraft testing:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Halted by: ", acceptedAnswers: [damage.toLowerCase()], distractors: [], evidenceQuote: `...after a damaging ${damage}...`, listeningTechnique: "Identify airfield accident descriptions.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 13, sectionId: 2, type: 'gap_fill', prompt: "Year public exhibitions commenced:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Commenced: ", acceptedAnswers: [String(renoYear)], distractors: [{ choiceOrWord: String(year), trapReason: "Commissioning date." }], evidenceQuote: `...public exhibitions commenced in ${renoYear}.`, listeningTechnique: "Extract museum opening years.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 14, sectionId: 2, type: 'gap_fill', prompt: "Percentage funding airframe conservation:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Conservation: ", contextAfter: " %", acceptedAnswers: [String(conservPct)], distractors: [{ choiceOrWord: String(eduPct), trapReason: "School STEM workshops." }], evidenceQuote: `Currently, ${conservPct} percent of ticket admissions goes directly to airframe conservation.`, listeningTechnique: "Map percentage shares to structural preservation.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 15, sectionId: 2, type: 'gap_fill', prompt: "Percentage funding school STEM aeronautics workshops:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "STEM workshops: ", contextAfter: " %", acceptedAnswers: [String(eduPct), "twenty-seven"], distractors: [], evidenceQuote: `An additional ${eduPct} percent funds school STEM...`, listeningTechnique: "Extract educational shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 16, sectionId: 2, type: 'gap_fill', prompt: "Percentage financing perimeter security:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Security: ", contextAfter: " %", acceptedAnswers: [String(secPct)], distractors: [], evidenceQuote: `The remaining ${secPct} percent finances perimeter security...`, listeningTechnique: "Identify perimeter security shares.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 17, sectionId: 2, type: 'gap_fill', prompt: "Area where photography is unrestricted:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Unrestricted on: ", acceptedAnswers: [permArea.toLowerCase()], distractors: [], evidenceQuote: `Photography is unrestricted across all ${permArea}.`, listeningTechnique: "Capture open airfield areas.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 18, sectionId: 2, type: 'gap_fill', prompt: "Restricted enclosure where flash cameras must be off:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Restricted enclosure: ", acceptedAnswers: [chamber.toLowerCase(), "cockpit enclosure"], distractors: [], evidenceQuote: `However, entering the ${chamber}...`, listeningTechnique: "Transcribe aircraft enclosure names.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 19, sectionId: 2, type: 'gap_fill', prompt: "Delicate instruments shielded from damage:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Protects: ", acceptedAnswers: [fragileItem.toLowerCase()], distractors: [], evidenceQuote: `...protects delicate ${fragileItem} from electrostatic...`, listeningTechnique: "Identify delicate avionics components.", difficultyProfile: generateDifficultyProfile(rng, 2) },
        { id: 20, sectionId: 2, type: 'gap_fill', prompt: "Auditory signal sounded during engine ground tests:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Sounded: ", acceptedAnswers: [signal.toLowerCase()], distractors: [], evidenceQuote: `...safety marshals sound the loud ${signal}.`, listeningTechnique: "Capture airfield warning signals.", difficultyProfile: generateDifficultyProfile(rng, 2) }
      ];

      return { audio, questions };
    }
  }
];

export function generateProceduralSection2(testId: number, rng: () => number): Section {
  const archIndex = (testId * 3) % S2_ARCHETYPES.length;
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
