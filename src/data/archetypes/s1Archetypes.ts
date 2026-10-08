import { Section, AudioTurn, Question } from '../../types/test';
import { generateDifficultyProfile } from './helpers';

export interface S1Archetype {
  title: string;
  description: string;
  build: (testId: number, rng: () => number) => { audio: AudioTurn[]; questions: Question[] };
}

export const S1_ARCHETYPES: S1Archetype[] = [
  // 1: Coastal Marine Wildlife Diving Survey
  {
    title: "Section 1: Coastal Marine Wildlife Diving Survey Registration",
    description: "A volunteer diver calls the marine station officer to register their qualifications and schedule survey dates.",
    build: (testId, rng) => {
      const surname = ["MacIntyre", "Gallagher", "Fitzgerald", "Kowalski", "Sinclair"][testId % 5];
      const phoneOld = `07700 900 ${100 + ((testId * 13) % 700)}`;
      const phoneNew = `07700 900 ${250 + ((testId * 19) % 700)}`;
      const cert = ["Advanced Open Water", "Rescue Diver", "Divemaster", "Master Scuba Diver"][testId % 4];
      const day = 12 + ((testId * 3) % 16);
      const vessel = ["catamaran", "trimaran", "zodiac", "cutter"][testId % 4];
      const deposit = 140 + ((testId * 15) % 120);
      const personalGear = ["diving knife", "dive computer", "depth gauge", "surface marker"][testId % 4];
      const stationGear = ["buoyancy vests", "oxygen cylinders", "weight belts", "neoprene hoods"][testId % 4];
      const postcode = `${["EH", "CB", "OX", "GL", "CF"][testId % 5]}${((testId * 3) % 8) + 1} ${((testId * 7) % 8) + 1}AB`;
      const zone = ["benthic reef", "kelp forest", "rocky shoal", "sea cave"][testId % 4];

      const audio: AudioTurn[] = [
        { speaker: "Officer Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Coastal Wildlife Survey Office, Henderson speaking. May I take your surname to begin your diver registration?` },
        { speaker: "Callum", speakerRole: 'speaker2', accent: 'en-AU', text: `Yes, my surname is ${surname}, spelled ${surname.toUpperCase().split('').join('-')}.` },
        { speaker: "Officer Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Got that, ${surname}. And what is your emergency mobile line?` },
        { speaker: "Callum", speakerRole: 'speaker2', accent: 'en-AU', text: `It's ${phoneOld}... actually wait, that's my disconnected landline. My offshore mobile is ${phoneNew}.` },
        { speaker: "Officer Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Noted: ${phoneNew}. What diver certification grade do you currently hold?` },
        { speaker: "Callum", speakerRole: 'speaker2', accent: 'en-AU', text: `I hold a certified ${cert} qualification.` },
        { speaker: "Officer Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Excellent. Our logistics calendar has arrival scheduled for the ${day}th of August.` },
        { speaker: "Callum", speakerRole: 'speaker2', accent: 'en-AU', text: `The ${day}th of August suits us fine. We chartered the ${vessel} to transport our equipment.` },
        { speaker: "Officer Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `Splendid. The underwater camera deposit is £${deposit}. Note that each diver must bring their own ${personalGear}.` },
        { speaker: "Callum", speakerRole: 'speaker2', accent: 'en-AU', text: `Understood, I'll bring my ${personalGear}. And what equipment does the station provide?` },
        { speaker: "Officer Henderson", speakerRole: 'speaker1', accent: 'en-GB', text: `The station supplies all ${stationGear} free of charge. Please give me your billing postcode.` },
        { speaker: "Callum", speakerRole: 'speaker2', accent: 'en-AU', text: `The postcode is ${postcode}. Our team is assigned to survey the ${zone}.` }
      ];

      const questions: Question[] = [
        { id: 1, sectionId: 1, type: 'gap_fill', prompt: "Volunteer diver surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Surname: ", acceptedAnswers: [surname.toLowerCase()], distractors: [], evidenceQuote: `Yes, my surname is ${surname}...`, listeningTechnique: "Transcribe spelled family names accurately.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 2, sectionId: 1, type: 'gap_fill', prompt: "Offshore emergency mobile number:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Mobile: ", acceptedAnswers: [phoneNew, phoneNew.replace(/\s+/g, '')], distractors: [{ choiceOrWord: phoneOld, trapReason: "Disconnected landline." }], evidenceQuote: `My offshore mobile is ${phoneNew}.`, listeningTechnique: "Listen through telephone number retractions.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 3, sectionId: 1, type: 'gap_fill', prompt: "Diver qualification grade:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Certification: ", acceptedAnswers: [cert.toLowerCase()], distractors: [], evidenceQuote: `I hold a certified ${cert} qualification.`, listeningTechnique: "Capture certification titles.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 4, sectionId: 1, type: 'gap_fill', prompt: "Confirmed arrival date in August:", instruction: "Write ONE NUMBER AND/OR A WORD for each answer.", contextBefore: "Arrival: ", contextAfter: " August", acceptedAnswers: [String(day), `${day}th`], distractors: [], evidenceQuote: `...arrival scheduled for the ${day}th of August.`, listeningTechnique: "Extract calendar dates.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 5, sectionId: 1, type: 'gap_fill', prompt: "Vessel chartered for equipment transport:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Chartered vessel: ", acceptedAnswers: [vessel.toLowerCase()], distractors: [], evidenceQuote: `We chartered the ${vessel} to transport our equipment.`, listeningTechnique: "Capture vessel nouns.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 6, sectionId: 1, type: 'gap_fill', prompt: "Underwater camera kit deposit fee:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Camera Deposit: £", acceptedAnswers: [String(deposit)], distractors: [], evidenceQuote: `The underwater camera deposit is £${deposit}.`, listeningTechnique: "Identify monetary figures.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 7, sectionId: 1, type: 'gap_fill', prompt: "Personal gear item diver must bring:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Diver must bring: ", acceptedAnswers: [personalGear.toLowerCase()], distractors: [{ choiceOrWord: stationGear.toLowerCase(), trapReason: "Furnished by station." }], evidenceQuote: `...each diver must bring their own ${personalGear}.`, listeningTechnique: "Differentiate personal gear from station-provided gear.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 8, sectionId: 1, type: 'gap_fill', prompt: "Equipment provided free by the station:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Station supplies: ", acceptedAnswers: [stationGear.toLowerCase()], distractors: [{ choiceOrWord: personalGear.toLowerCase(), trapReason: "Brought by diver." }], evidenceQuote: `The station supplies all ${stationGear} free of charge.`, listeningTechnique: "Isolate station supplies.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 9, sectionId: 1, type: 'gap_fill', prompt: "Billing invoice postcode:", instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.", contextBefore: "Postcode: ", acceptedAnswers: [postcode.toLowerCase(), postcode.toLowerCase().replace(/\s+/g, '')], distractors: [], evidenceQuote: `The postcode is ${postcode}.`, listeningTechnique: "Transcribe UK postcodes accurately.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 10, sectionId: 1, type: 'gap_fill', prompt: "Assigned marine survey habitat:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Survey habitat: ", acceptedAnswers: [zone.toLowerCase()], distractors: [], evidenceQuote: `Our team is assigned to survey the ${zone}.`, listeningTechnique: "Capture final closing context nouns.", difficultyProfile: generateDifficultyProfile(rng, 1) }
      ];

      return { audio, questions };
    }
  },

  // 2: Rare Manuscript & Archives Consultation
  {
    title: "Section 1: Special Collections Library & Rare Manuscript Permit",
    description: "A postgraduate researcher calls the special collections archivist to book an archive reading carrel and consult historical documents.",
    build: (testId, rng) => {
      const surname = ["Vance", "Kensington", "Abercrombie", "Hawthorne", "Pendleton"][testId % 5];
      const cardNum = 1200 + ((testId * 37) % 8500);
      const phoneNew = `07700 900 ${310 + ((testId * 23) % 650)}`;
      const collection = ["parchment charters", "botanical folios", "heraldic seals", "medieval cartularies"][testId % 4];
      const day = 10 + ((testId * 4) % 18);
      const carrel = 12 + ((testId * 7) % 35);
      const deposit = 45 + ((testId * 5) % 40);
      const requiredWear = ["cotton gloves", "linen aprons", "wristbands"][testId % 3];
      const providedTool = ["magnifying lenses", "book weights", "cradle stands", "fiberoptic lamps"][testId % 4];
      const postcode = `${["OX", "CB", "SW", "BT", "EH"][testId % 5]}${((testId * 2) % 9) + 1} ${((testId * 6) % 9) + 1}XP`;

      const audio: AudioTurn[] = [
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `Special Collections Desk, Miller speaking. May I have your surname for the manuscript reader permit?` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `Hello. My surname is ${surname}, spelled ${surname.toUpperCase().split('').join('-')}.` },
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `Thank you, ${surname}. What is your registered reader card number?` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `My reader card number is RC-${cardNum}.` },
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `RC-${cardNum}, verified. And your daytime contact phone?` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `You can reach me directly on ${phoneNew}.` },
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `Noted: ${phoneNew}. Which archival collection do you need to inspect?` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `I am consulting the 14th-century ${collection}.` },
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `Understood. Your reservation is confirmed for the ${day}th of September.` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `Thank you. Which reading carrel have I been assigned?` },
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `You will be at carrel number ${carrel}. There is a locker key deposit fee of £${deposit}.` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `That's fine. Do readers need to bring any protective wear?` },
        { speaker: "Archivist Miller", speakerRole: 'speaker1', accent: 'en-GB', text: `Readers must bring their own ${requiredWear}, while the archive furnishes ${providedTool}.` },
        { speaker: "Eleanor", speakerRole: 'speaker2', accent: 'en-US', text: `Splendid. Please post the security pass to postcode ${postcode}.` }
      ];

      const questions: Question[] = [
        { id: 1, sectionId: 1, type: 'gap_fill', prompt: "Researcher surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Surname: ", acceptedAnswers: [surname.toLowerCase()], distractors: [], evidenceQuote: `My surname is ${surname}...`, listeningTechnique: "Transcribe spelled researcher surnames.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 2, sectionId: 1, type: 'gap_fill', prompt: "Registered reader card registration code:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Card Number: RC-", acceptedAnswers: [String(cardNum), `rc-${cardNum}`, `rc${cardNum}`], distractors: [], evidenceQuote: `My reader card number is RC-${cardNum}.`, listeningTechnique: "Extract numerical alphanumeric identifiers.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 3, sectionId: 1, type: 'gap_fill', prompt: "Daytime contact phone number:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Phone: ", acceptedAnswers: [phoneNew, phoneNew.replace(/\s+/g, '')], distractors: [], evidenceQuote: `reach me directly on ${phoneNew}.`, listeningTechnique: "Capture phone strings.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 4, sectionId: 1, type: 'gap_fill', prompt: "Archival collection to be inspected:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Collection: ", acceptedAnswers: [collection.toLowerCase()], distractors: [], evidenceQuote: `I am consulting the 14th-century ${collection}.`, listeningTechnique: "Identify specific collection names.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 5, sectionId: 1, type: 'gap_fill', prompt: "Confirmed reservation date in September:", instruction: "Write ONE NUMBER AND/OR A WORD for each answer.", contextBefore: "Date: ", contextAfter: " September", acceptedAnswers: [String(day), `${day}th`], distractors: [], evidenceQuote: `...confirmed for the ${day}th of September.`, listeningTechnique: "Extract calendar dates.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 6, sectionId: 1, type: 'gap_fill', prompt: "Assigned reading carrel number:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Carrel Number: ", acceptedAnswers: [String(carrel)], distractors: [], evidenceQuote: `You will be at carrel number ${carrel}.`, listeningTechnique: "Capture workstation numbers.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 7, sectionId: 1, type: 'gap_fill', prompt: "Locker key deposit fee:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Deposit: £", acceptedAnswers: [String(deposit)], distractors: [], evidenceQuote: `There is a locker key deposit fee of £${deposit}.`, listeningTechnique: "Capture fee figures.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 8, sectionId: 1, type: 'gap_fill', prompt: "Protective wear readers must bring:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Reader must bring: ", acceptedAnswers: [requiredWear.toLowerCase()], distractors: [{ choiceOrWord: providedTool.toLowerCase(), trapReason: "Furnished by library." }], evidenceQuote: `Readers must bring their own ${requiredWear}...`, listeningTechnique: "Distinguish reader items from library tools.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 9, sectionId: 1, type: 'gap_fill', prompt: "Equipment furnished by the archive:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Archive furnishes: ", acceptedAnswers: [providedTool.toLowerCase()], distractors: [{ choiceOrWord: requiredWear.toLowerCase(), trapReason: "Brought by reader." }], evidenceQuote: `...while the archive furnishes ${providedTool}.`, listeningTechnique: "Isolate facility-supplied tools.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 10, sectionId: 1, type: 'gap_fill', prompt: "Security pass mailing postcode:", instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.", contextBefore: "Postcode: ", acceptedAnswers: [postcode.toLowerCase(), postcode.toLowerCase().replace(/\s+/g, '')], distractors: [], evidenceQuote: `Please post the security pass to postcode ${postcode}.`, listeningTechnique: "Transcribe UK postcodes accurately.", difficultyProfile: generateDifficultyProfile(rng, 1) }
      ];

      return { audio, questions };
    }
  },

  // 3: Sports Medicine & Physiotherapy Assessment Intake
  {
    title: "Section 1: Sports Medicine & Physiotherapy Assessment Intake",
    description: "An injured athlete calls a sports physiotherapy clinic to arrange an initial clinical assessment.",
    build: (testId, rng) => {
      const surname = ["Davies", "Callaghan", "Sterling", "Bradshaw", "Montgomery"][testId % 5];
      const phoneNew = `07700 900 ${410 + ((testId * 11) % 550)}`;
      const injury = ["knee meniscus", "rotator cuff", "achilles tendon", "hamstring tear"][testId % 4];
      const sport = ["rugby", "football", "badminton", "athletics"][testId % 4];
      const doc = ["Fletcher", "Patel", "Kowalski", "Armstrong", "O'Reilly"][testId % 5];
      const day = 14 + ((testId * 3) % 15);
      const fee = 85 + ((testId * 10) % 65);
      const patientItem = ["compression bandage", "strapping tape", "support brace"][testId % 3];
      const clinicSupply = ["ice therapy packs", "ultrasound gel", "resistance bands"][testId % 3];
      const postcode = `${["CF", "EH", "GL", "CB", "BT"][testId % 5]}${((testId * 4) % 8) + 1} ${((testId * 5) % 8) + 1}RD`;

      const audio: AudioTurn[] = [
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `Sports Medicine Clinic, Claire speaking. May I have your surname for your patient file?` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `Yes, my surname is ${surname}, spelled ${surname.toUpperCase().split('').join('-')}.` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `Thank you, ${surname}. What contact mobile should we log?` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `You can reach me on ${phoneNew}.` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `Got that: ${phoneNew}. What specific joint or tissue was injured?` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `I suffered a severe ${injury} tear during training.` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `I see. What sporting activity caused the trauma?` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `It happened during a ${sport} match last Saturday.` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `Were you referred by a physician?` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `Yes, by Dr. ${doc}.` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `We have an appointment slot on the ${day}th of October with our senior consultant.` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `The ${day}th of October is perfect. What is the consultation assessment fee?` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `The private evaluation fee is £${fee}. Patients must bring their own ${patientItem}.` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `Noted, I will bring my ${patientItem}. Does the clinic provide cold therapy?` },
        { speaker: "Receptionist Claire", speakerRole: 'speaker1', accent: 'en-GB', text: `Yes, the clinic supplies all ${clinicSupply}. What is your billing postcode?` },
        { speaker: "Gareth", speakerRole: 'speaker2', accent: 'en-AU', text: `My billing postcode is ${postcode}.` }
      ];

      const questions: Question[] = [
        { id: 1, sectionId: 1, type: 'gap_fill', prompt: "Patient surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Surname: ", acceptedAnswers: [surname.toLowerCase()], distractors: [], evidenceQuote: `Yes, my surname is ${surname}...`, listeningTechnique: "Transcribe patient surnames.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 2, sectionId: 1, type: 'gap_fill', prompt: "Patient contact mobile number:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Mobile: ", acceptedAnswers: [phoneNew, phoneNew.replace(/\s+/g, '')], distractors: [], evidenceQuote: `reach me on ${phoneNew}.`, listeningTechnique: "Transcribe numeric phone sequences.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 3, sectionId: 1, type: 'gap_fill', prompt: "Specific anatomical structure injured:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Injured structure: ", acceptedAnswers: [injury.toLowerCase()], distractors: [], evidenceQuote: `...suffered a severe ${injury} tear...`, listeningTechnique: "Identify specific medical joints and ligaments.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 4, sectionId: 1, type: 'gap_fill', prompt: "Sporting activity during which injury occurred:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Sport: ", acceptedAnswers: [sport.toLowerCase()], distractors: [], evidenceQuote: `It happened during a ${sport} match...`, listeningTechnique: "Extract athletic context nouns.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 5, sectionId: 1, type: 'gap_fill', prompt: "Referring physician surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Referred by: Dr. ", acceptedAnswers: [doc.toLowerCase()], distractors: [], evidenceQuote: `Yes, by Dr. ${doc}.`, listeningTechnique: "Capture doctor names.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 6, sectionId: 1, type: 'gap_fill', prompt: "Assessment appointment date in October:", instruction: "Write ONE NUMBER AND/OR A WORD for each answer.", contextBefore: "Date: ", contextAfter: " October", acceptedAnswers: [String(day), `${day}th`], distractors: [], evidenceQuote: `...slot on the ${day}th of October...`, listeningTechnique: "Capture calendar appointments.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 7, sectionId: 1, type: 'gap_fill', prompt: "Private consultation fee:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Consultation Fee: £", acceptedAnswers: [String(fee)], distractors: [], evidenceQuote: `The private evaluation fee is £${fee}.`, listeningTechnique: "Capture clinical fee figures.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 8, sectionId: 1, type: 'gap_fill', prompt: "Personal medical item patient must bring:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Patient must bring: ", acceptedAnswers: [patientItem.toLowerCase()], distractors: [{ choiceOrWord: clinicSupply.toLowerCase(), trapReason: "Provided by clinic." }], evidenceQuote: `Patients must bring their own ${patientItem}.`, listeningTechnique: "Distinguish patient supplies from clinic supplies.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 9, sectionId: 1, type: 'gap_fill', prompt: "Therapy item furnished by the clinic:", instruction: "Write NO MORE THAN THREE WORDS for each answer.", contextBefore: "Clinic supplies: ", acceptedAnswers: [clinicSupply.toLowerCase()], distractors: [{ choiceOrWord: patientItem.toLowerCase(), trapReason: "Brought by patient." }], evidenceQuote: `...the clinic supplies all ${clinicSupply}.`, listeningTechnique: "Isolate clinic supplies.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 10, sectionId: 1, type: 'gap_fill', prompt: "Patient billing postcode:", instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.", contextBefore: "Postcode: ", acceptedAnswers: [postcode.toLowerCase(), postcode.toLowerCase().replace(/\s+/g, '')], distractors: [], evidenceQuote: `My billing postcode is ${postcode}.`, listeningTechnique: "Transcribe UK postal codes.", difficultyProfile: generateDifficultyProfile(rng, 1) }
      ];

      return { audio, questions };
    }
  },

  // 4: International Student Homestay Booking
  {
    title: "Section 1: International Student Homestay Accommodation Registration",
    description: "An international student calls a student housing coordinator to arrange homestay accommodation for the academic semester.",
    build: (testId, rng) => {
      const surname = ["Tanaka", "Lindqvist", "Kowalski", "Bhandari", "Choudhury"][testId % 5];
      const phoneNew = `07700 900 ${520 + ((testId * 17) % 450)}`;
      const diet = ["vegetarian", "gluten-free", "halal", "dairy-free"][testId % 4];
      const day = 15 + ((testId * 2) % 14);
      const room = ["ensuite bedroom", "attic studio", "garden room"][testId % 3];
      const deposit = 160 + ((testId * 12) % 80);
      const linen = ["sleeping bag", "pillowcase", "towel set"][testId % 3];
      const amenity = ["broadband internet", "laundry service", "bicycle storage"][testId % 3];
      const postcode = `${["OX", "CB", "EH", "SW", "GL"][testId % 5]}${((testId * 5) % 8) + 1} ${((testId * 3) % 8) + 1}LN`;
      const club = ["violin ensemble", "debate society", "chess club", "rowing club"][testId % 4];

      const audio: AudioTurn[] = [
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `International Housing Office, Mrs. Adams speaking. May I have your surname for your homestay profile?` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `Hello, my surname is ${surname}, spelled ${surname.toUpperCase().split('').join('-')}.` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `Thank you, ${surname}. What contact mobile will you be using in the UK?` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `My UK mobile number is ${phoneNew}.` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `Logged: ${phoneNew}. Do you have any dietary requirements for the host family?` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `Yes, I require strictly ${diet} meals.` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `Noted: ${diet}. What date will you be arriving at the residence?` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `My flight lands on the ${day}th of September.` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `The ${day}th of September. Which room category do you prefer?` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `I would prefer an ${room}.` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `We can arrange an ${room}. The initial holding deposit is £${deposit}.` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `That's fine. What personal bedding should I bring?` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `Students must bring their own ${linen}, while the host home provides ${amenity}.` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `Great! The university campus postcode is ${postcode}.` },
        { speaker: "Coordinator Mrs. Adams", speakerRole: 'speaker1', accent: 'en-GB', text: `Splendid. And what extracurricular society do you intend to join?` },
        { speaker: "Kenji", speakerRole: 'speaker2', accent: 'en-US', text: `I hope to join the ${club}.` }
      ];

      const questions: Question[] = [
        { id: 1, sectionId: 1, type: 'gap_fill', prompt: "Student surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Surname: ", acceptedAnswers: [surname.toLowerCase()], distractors: [], evidenceQuote: `my surname is ${surname}...`, listeningTechnique: "Transcribe international surnames.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 2, sectionId: 1, type: 'gap_fill', prompt: "Student UK mobile contact number:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Mobile: ", acceptedAnswers: [phoneNew, phoneNew.replace(/\s+/g, '')], distractors: [], evidenceQuote: `My UK mobile number is ${phoneNew}.`, listeningTechnique: "Transcribe contact numbers.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 3, sectionId: 1, type: 'gap_fill', prompt: "Special dietary requirement:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Diet: ", acceptedAnswers: [diet.toLowerCase()], distractors: [], evidenceQuote: `...require strictly ${diet} meals.`, listeningTechnique: "Capture dietary adjectives.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 4, sectionId: 1, type: 'gap_fill', prompt: "Arrival date in September:", instruction: "Write ONE NUMBER AND/OR A WORD for each answer.", contextBefore: "Arrival: ", contextAfter: " September", acceptedAnswers: [String(day), `${day}th`], distractors: [], evidenceQuote: `...lands on the ${day}th of September.`, listeningTechnique: "Extract calendar arrival dates.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 5, sectionId: 1, type: 'gap_fill', prompt: "Requested room type:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Room Type: ", acceptedAnswers: [room.toLowerCase()], distractors: [], evidenceQuote: `I would prefer an ${room}.`, listeningTechnique: "Capture accommodation types.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 6, sectionId: 1, type: 'gap_fill', prompt: "Holding deposit fee:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Deposit: £", acceptedAnswers: [String(deposit)], distractors: [], evidenceQuote: `The initial holding deposit is £${deposit}.`, listeningTechnique: "Capture deposit figures.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 7, sectionId: 1, type: 'gap_fill', prompt: "Personal linen item student must bring:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Student brings: ", acceptedAnswers: [linen.toLowerCase()], distractors: [{ choiceOrWord: amenity.toLowerCase(), trapReason: "Supplied by host." }], evidenceQuote: `Students must bring their own ${linen}...`, listeningTechnique: "Separate student items from host amenities.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 8, sectionId: 1, type: 'gap_fill', prompt: "Amenity provided by host home:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Host provides: ", acceptedAnswers: [amenity.toLowerCase()], distractors: [{ choiceOrWord: linen.toLowerCase(), trapReason: "Brought by student." }], evidenceQuote: `...while the host home provides ${amenity}.`, listeningTechnique: "Identify home amenities.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 9, sectionId: 1, type: 'gap_fill', prompt: "University campus postcode:", instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.", contextBefore: "Postcode: ", acceptedAnswers: [postcode.toLowerCase(), postcode.toLowerCase().replace(/\s+/g, '')], distractors: [], evidenceQuote: `The university campus postcode is ${postcode}.`, listeningTechnique: "Transcribe UK postcodes.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 10, sectionId: 1, type: 'gap_fill', prompt: "Extracurricular society student hopes to join:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Society: ", acceptedAnswers: [club.toLowerCase()], distractors: [], evidenceQuote: `I hope to join the ${club}.`, listeningTechnique: "Capture student clubs.", difficultyProfile: generateDifficultyProfile(rng, 1) }
      ];

      return { audio, questions };
    }
  },

  // 5: Renewable Energy Solar Survey
  {
    title: "Section 1: Domestic Solar & Heat Pump Technical Feasibility Intake",
    description: "A homeowner calls a green energy surveyor to arrange a technical survey for rooftop solar panels and heat pump installation.",
    build: (testId, rng) => {
      const surname = ["Thorne", "Bradshaw", "Montgomery", "Sinclair", "Hawthorne"][testId % 5];
      const phoneNew = `07700 900 ${610 + ((testId * 29) % 350)}`;
      const propType = ["detached cottage", "victorian terrace", "semi-detached villa", "timber barn"][testId % 4];
      const day = 11 + ((testId * 4) % 16);
      const heating = ["oil boiler", "coal stove", "gas heater", "storage heaters"][testId % 4];
      const deposit = 95 + ((testId * 8) % 60);
      const documentReq = ["electricity bills", "building floorplans", "property deeds"][testId % 3];
      const surveyorTool = ["thermal camera", "drone sensor", "roof inclinometer"][testId % 3];
      const postcode = `${["GL", "EH", "OX", "CB", "CF"][testId % 5]}${((testId * 3) % 9) + 1} ${((testId * 4) % 9) + 1}ST`;
      const tech = ["solar panels", "heat pump", "battery storage"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `EcoEnergy Survey Desk, Nigel speaking. May I take your surname to open a technical enquiry?` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `Yes, my surname is ${surname}, spelled ${surname.toUpperCase().split('').join('-')}.` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `Thank you Mr. ${surname}. What is your daytime mobile?` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `My direct line is ${phoneNew}.` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `Logged: ${phoneNew}. What architectural style is the domestic dwelling?` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `It is an old ${propType}.` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `Understood. We have an engineer inspection slot on the ${day}th of November.` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `The ${day}th of November suits us well.` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `What heating system is currently in operation?` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `We currently rely on an old ${heating}.` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `The technical assessment booking deposit is £${deposit}.` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `That's fine. What documents must the homeowner prepare?` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `You must prepare recent ${documentReq}, while the engineer brings a ${surveyorTool}.` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `Noted. The installation property postcode is ${postcode}.` },
        { speaker: "Surveyor Nigel", speakerRole: 'speaker1', accent: 'en-GB', text: `Splendid. And which renewable upgrade is your highest priority?` },
        { speaker: "Mark", speakerRole: 'speaker2', accent: 'en-GB', text: `Our main priority is installing ${tech}.` }
      ];

      const questions: Question[] = [
        { id: 1, sectionId: 1, type: 'gap_fill', prompt: "Homeowner surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Surname: ", acceptedAnswers: [surname.toLowerCase()], distractors: [], evidenceQuote: `Yes, my surname is ${surname}...`, listeningTechnique: "Transcribe homeowner family names.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 2, sectionId: 1, type: 'gap_fill', prompt: "Direct mobile line:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Mobile: ", acceptedAnswers: [phoneNew, phoneNew.replace(/\s+/g, '')], distractors: [], evidenceQuote: `My direct line is ${phoneNew}.`, listeningTechnique: "Capture mobile digits.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 3, sectionId: 1, type: 'gap_fill', prompt: "Domestic dwelling architectural style:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Dwelling: ", acceptedAnswers: [propType.toLowerCase()], distractors: [], evidenceQuote: `It is an old ${propType}.`, listeningTechnique: "Capture property descriptions.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 4, sectionId: 1, type: 'gap_fill', prompt: "Survey inspection date in November:", instruction: "Write ONE NUMBER AND/OR A WORD for each answer.", contextBefore: "Date: ", contextAfter: " November", acceptedAnswers: [String(day), `${day}th`], distractors: [], evidenceQuote: `...slot on the ${day}th of November.`, listeningTechnique: "Extract calendar inspection dates.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 5, sectionId: 1, type: 'gap_fill', prompt: "Existing heating system currently in operation:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Current heating: ", acceptedAnswers: [heating.toLowerCase()], distractors: [], evidenceQuote: `We currently rely on an old ${heating}.`, listeningTechnique: "Identify heating equipment.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 6, sectionId: 1, type: 'gap_fill', prompt: "Technical assessment booking deposit:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Deposit: £", acceptedAnswers: [String(deposit)], distractors: [], evidenceQuote: `The technical assessment booking deposit is £${deposit}.`, listeningTechnique: "Capture deposit values.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 7, sectionId: 1, type: 'gap_fill', prompt: "Documentation homeowner must prepare:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Owner must prepare: ", acceptedAnswers: [documentReq.toLowerCase()], distractors: [{ choiceOrWord: surveyorTool.toLowerCase(), trapReason: "Brought by surveyor." }], evidenceQuote: `You must prepare recent ${documentReq}...`, listeningTechnique: "Separate customer preparations from surveyor tools.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 8, sectionId: 1, type: 'gap_fill', prompt: "Diagnostic tool brought by surveyor:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Surveyor brings: ", acceptedAnswers: [surveyorTool.toLowerCase()], distractors: [{ choiceOrWord: documentReq.toLowerCase(), trapReason: "Prepared by owner." }], evidenceQuote: `...while the engineer brings a ${surveyorTool}.`, listeningTechnique: "Isolate surveyor diagnostic equipment.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 9, sectionId: 1, type: 'gap_fill', prompt: "Installation property postcode:", instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.", contextBefore: "Postcode: ", acceptedAnswers: [postcode.toLowerCase(), postcode.toLowerCase().replace(/\s+/g, '')], distractors: [], evidenceQuote: `The installation property postcode is ${postcode}.`, listeningTechnique: "Transcribe UK postcodes accurately.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 10, sectionId: 1, type: 'gap_fill', prompt: "Renewable upgrade with highest priority:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Highest priority: ", acceptedAnswers: [tech.toLowerCase()], distractors: [], evidenceQuote: `Our main priority is installing ${tech}.`, listeningTechnique: "Extract customer priorities.", difficultyProfile: generateDifficultyProfile(rng, 1) }
      ];

      return { audio, questions };
    }
  },

  // 6: Vintage Motorcar Restoration Club Membership
  {
    title: "Section 1: Vintage Motorcar Restoration Guild Membership Enrolment",
    description: "An automobile enthusiast calls the vintage motor guild workshop secretary to register for workshop access and specialized tooling.",
    build: (testId, rng) => {
      const surname = ["Sinclair", "Beaumont", "Hawthorne", "Kensington", "Abercrombie"][testId % 5];
      const phoneNew = `07700 900 ${715 + ((testId * 19) % 280)}`;
      const car = ["Jaguar XK", "Triumph Spitfire", "Austin Healey", "Lotus Elan"][testId % 4];
      const day = 16 + ((testId * 3) % 14);
      const stage = ["gearbox rebuild", "cylinder overhaul", "chassis alignment", "carburetor tuning"][testId % 4];
      const fee = 175 + ((testId * 10) % 95);
      const memberGear = ["protective goggles", "leather gloves", "steel boots"][testId % 3];
      const workshopGear = ["hydraulic lifts", "torque wrenches", "lathe machines"][testId % 3];
      const postcode = `${["BT", "SW", "EH", "OX", "CB"][testId % 5]}${((testId * 7) % 8) + 1} ${((testId * 2) % 8) + 1}AP`;
      const skill = ["aluminum welding", "panel beating", "engine reboring"][testId % 3];

      const audio: AudioTurn[] = [
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `Vintage Motor Guild, Arthur speaking. May I take your surname for our registry?` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `Yes, my surname is ${surname}, spelled ${surname.toUpperCase().split('').join('-')}.` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `Welcome, ${surname}. What contact phone should we keep on record?` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `You can reach me at ${phoneNew}.` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `Noted: ${phoneNew}. What vintage motorcar model are you restoring?` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `I am currently restoring a classic ${car}.` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `A wonderful project. Our next workshop safety induction is on the ${day}th of December.` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `The ${day}th of December is fine with me.` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `What phase of mechanical restoration have you reached?` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `I am currently tackling the ${stage}.` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `The full annual guild membership fee is £${fee}.` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `Understood. What safety equipment must members supply themselves?` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `Members must supply personal ${memberGear}, while the guild furnishes all ${workshopGear}.` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `Perfect! Please send the membership pack to postcode ${postcode}.` },
        { speaker: "Guild Secretary Arthur", speakerRole: 'speaker1', accent: 'en-GB', text: `Noted: ${postcode}. And what specialized workshop skill do you wish to learn?` },
        { speaker: "Julian", speakerRole: 'speaker2', accent: 'en-GB', text: `I am keen to master ${skill}.` }
      ];

      const questions: Question[] = [
        { id: 1, sectionId: 1, type: 'gap_fill', prompt: "Guild member surname:", instruction: "Write ONE WORD ONLY for each answer.", contextBefore: "Surname: ", acceptedAnswers: [surname.toLowerCase()], distractors: [], evidenceQuote: `Yes, my surname is ${surname}...`, listeningTechnique: "Transcribe spelled member surnames.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 2, sectionId: 1, type: 'gap_fill', prompt: "Active telephone contact number:", instruction: "Write ONE WORD AND/OR A NUMBER for each answer.", contextBefore: "Phone: ", acceptedAnswers: [phoneNew, phoneNew.replace(/\s+/g, '')], distractors: [], evidenceQuote: `reach me at ${phoneNew}.`, listeningTechnique: "Transcribe telephone numbers.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 3, sectionId: 1, type: 'gap_fill', prompt: "Vintage vehicle model being restored:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Vehicle: ", acceptedAnswers: [car.toLowerCase()], distractors: [], evidenceQuote: `...restoring a classic ${car}.`, listeningTechnique: "Capture automotive models.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 4, sectionId: 1, type: 'gap_fill', prompt: "Workshop induction date in December:", instruction: "Write ONE NUMBER AND/OR A WORD for each answer.", contextBefore: "Date: ", contextAfter: " December", acceptedAnswers: [String(day), `${day}th`], distractors: [], evidenceQuote: `...induction is on the ${day}th of December.`, listeningTechnique: "Extract calendar induction dates.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 5, sectionId: 1, type: 'gap_fill', prompt: "Current stage of mechanical restoration:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Restoration Stage: ", acceptedAnswers: [stage.toLowerCase()], distractors: [], evidenceQuote: `I am currently tackling the ${stage}.`, listeningTechnique: "Identify engineering phases.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 6, sectionId: 1, type: 'gap_fill', prompt: "Annual guild membership fee:", instruction: "Write ONE NUMBER ONLY for each answer.", contextBefore: "Membership Fee: £", acceptedAnswers: [String(fee)], distractors: [], evidenceQuote: `The full annual guild membership fee is £${fee}.`, listeningTechnique: "Extract monetary subscription figures.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 7, sectionId: 1, type: 'gap_fill', prompt: "Mandatory personal safety gear member must bring:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Member must bring: ", acceptedAnswers: [memberGear.toLowerCase()], distractors: [{ choiceOrWord: workshopGear.toLowerCase(), trapReason: "Supplied by guild." }], evidenceQuote: `Members must supply personal ${memberGear}...`, listeningTechnique: "Separate member gear from guild machinery.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 8, sectionId: 1, type: 'gap_fill', prompt: "Heavy equipment furnished by the guild:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Guild furnishes: ", acceptedAnswers: [workshopGear.toLowerCase()], distractors: [{ choiceOrWord: memberGear.toLowerCase(), trapReason: "Supplied by member." }], evidenceQuote: `...while the guild furnishes all ${workshopGear}.`, listeningTechnique: "Isolate workshop equipment.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 9, sectionId: 1, type: 'gap_fill', prompt: "Registry membership pack postcode:", instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.", contextBefore: "Postcode: ", acceptedAnswers: [postcode.toLowerCase(), postcode.toLowerCase().replace(/\s+/g, '')], distractors: [], evidenceQuote: `Please send the membership pack to postcode ${postcode}.`, listeningTechnique: "Transcribe UK postcodes accurately.", difficultyProfile: generateDifficultyProfile(rng, 1) },
        { id: 10, sectionId: 1, type: 'gap_fill', prompt: "Specialized workshop skill member wishes to master:", instruction: "Write NO MORE THAN TWO WORDS for each answer.", contextBefore: "Skill: ", acceptedAnswers: [skill.toLowerCase()], distractors: [], evidenceQuote: `I am keen to master ${skill}.`, listeningTechnique: "Capture trade skills.", difficultyProfile: generateDifficultyProfile(rng, 1) }
      ];

      return { audio, questions };
    }
  }
];

export function generateProceduralSection1(testId: number, rng: () => number): Section {
  const archIndex = (testId - 1) % S1_ARCHETYPES.length;
  const arch = S1_ARCHETYPES[archIndex];
  const { audio, questions } = arch.build(testId, rng);

  return {
    sectionNumber: 1,
    title: arch.title,
    description: arch.description,
    contextType: 'transactional',
    audioScript: audio,
    questions
  };
}
