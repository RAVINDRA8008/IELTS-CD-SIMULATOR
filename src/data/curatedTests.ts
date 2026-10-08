import { IELTSTest, Section } from '../types/test';

export const CURATED_TEST_1: IELTSTest = {
  id: 1,
  title: "Cambridge Hard Edition 1: Environmental Systems & Urban Heritage",
  difficultyBandTarget: 'Brutal (Band 8.5-9.0)',
  overallDifficulty: 8.4,
  sections: [
    // SECTION 1
    {
      sectionNumber: 1,
      title: "Section 1: Field Expedition Accommodation & Logistics",
      description: "A student representative calls an expedition logistics coordinator to finalize arrangements for a university field trip.",
      contextType: 'transactional',
      audioScript: [
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Northbridge Ecological Logistics, Mark speaking. How can I assist you today?"
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "Hello Mark. I'm calling on behalf of the St. Jude's environmental science cohort. We're finalizing our coastal field study accommodation."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Ah, yes. I have the preliminary file open here. For the team leader, I have Jenna... is that McAllister?"
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "Close, but it's spelled M-C-A-L-I-S-T-A-I-R. With an 'A-I-R' at the end, not 'E-R'."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Right, corrected. And your primary contact number?"
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "You can reach me at 07700 900 482... oh wait, sorry, that's my domestic flatline which is currently disconnected. My expedition mobile is 07700 900 528."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "07700 900 528. Got it. Now, concerning the date of departure: our booking calendar originally logged you for the 14th of April."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "That was our initial projection, but our faculty supervisor pushed back our departmental briefing. We wanted the 16th, but due to ferry timetables, we must arrive on the 18th of April."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Understood. The 18th of April it is. How many researchers will be staying at the coastal lodge?"
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "We had twenty-eight sign up initially. Two withdrew last week due to exams, and four added on late. So that brings the final headcount to thirty."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Thirty participants. Now, regarding the vehicle rental: you inquired about the 12-seater transit van."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "Yes, but since our group expanded, we'll need the minibus with luggage trailer. Does that require the commercial permit?"
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Only if you exceed thirty-five seats. The standard 24-seater paired with an auxiliary trailer will be covered by your university driver's waiver."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "Excellent. And what is the deposit amount for the laboratory equipment storage shed?"
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "The peak seasonal rate is 250 pounds, but as an accredited tertiary partner, you receive our discounted rate of 175 pounds."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "That saves us some budget! What about the catering options? We have several members requesting dietary accommodations."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "We provide three tiers: continental breakfast only, half-board, and full-board. For remote fieldwork, most university teams opt for the packed lunch hamper, but we recommend our organic evening buffet package."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "Since our students will be on rocky shores until dusk, they won't make it to standard lunch hours. We'll definitely book the half-board option so dinner is prepared when we return."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Noted. And where should we invoice this? The postal address on your draft is 14 Highfield Terrace."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "No, that's our old biology annex. The bursar's office relocated to 29 Meadowbank Way, postcode EH10 5DX."
        },
        {
          speaker: "Coordinator Mark",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "29 Meadowbank Way, EH10 5DX. Lastly, all students must carry personal waterproof boots and a compass, while the lodge provides emergency beacons and first aid kits."
        },
        {
          speaker: "Student Jenna",
          speakerRole: "speaker2",
          accent: "en-AU",
          text: "Perfect. We'll remind everyone to pack their compass. Thank you Mark!"
        }
      ],
      questions: [
        {
          id: 1,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Team leader surname:",
          instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.",
          contextBefore: "Leader Surname: ",
          acceptedAnswers: ["mcalistair"],
          distractors: [
            { choiceOrWord: "mcallister", trapReason: "Phonetic trap: The coordinator assumed 'McAllister', but Jenna corrected the spelling to 'M-c-a-l-i-s-t-a-i-r'." }
          ],
          evidenceQuote: "Close, but it's spelled M-C-A-L-I-S-T-A-I-R. With an 'A-I-R' at the end, not 'E-R'.",
          listeningTechnique: "Carefully note letter-by-letter corrections where the speaker explicitly clarifies diphthongs and endings.",
          difficultyProfile: {
            difficulty: 6.8,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 5, paraphrase_distance: 6, distractor_density: 7, correction_frequency: 9, speaker_switching: 7, answer_prediction_difficulty: 6, numerical_density: 5, syntactic_complexity: 6, accent_variation: 7 }
          }
        },
        {
          id: 2,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Contact mobile number:",
          instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.",
          contextBefore: "Contact Mobile: ",
          acceptedAnswers: ["07700 900 528", "07700900528"],
          distractors: [
            { choiceOrWord: "07700 900 482", trapReason: "Self-correction trap: Jenna started giving her domestic flatline number (ending 482) before correcting that it is disconnected." }
          ],
          evidenceQuote: "You can reach me at 07700 900 482... oh wait, sorry, that's my domestic flatline which is currently disconnected. My expedition mobile is 07700 900 528.",
          listeningTechnique: "Never write down the first phone number impulsively; listen for retraction signals ('oh wait, sorry').",
          difficultyProfile: {
            difficulty: 7.2,
            level: 'Hard',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 4, paraphrase_distance: 6, distractor_density: 8, correction_frequency: 9, speaker_switching: 6, answer_prediction_difficulty: 6, numerical_density: 9, syntactic_complexity: 6, accent_variation: 7 }
          }
        },
        {
          id: 3,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Date of arrival at coastal lodge:",
          instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
          contextBefore: "Arrival Date: ",
          contextAfter: " April",
          acceptedAnswers: ["18", "18th", "18 April", "18th April"],
          distractors: [
            { choiceOrWord: "14", trapReason: "Past plan: 14th was the original projection logged in the calendar." },
            { choiceOrWord: "16", trapReason: "Desired date: They wanted the 16th, but ferry schedules forced them to the 18th." }
          ],
          evidenceQuote: "That was our initial projection... We wanted the 16th, but due to ferry timetables, we must arrive on the 18th of April.",
          listeningTechnique: "Filter out intended or requested dates when logistical constraints impose the final confirmed date.",
          difficultyProfile: {
            difficulty: 7.5,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 6, paraphrase_distance: 7, distractor_density: 9, correction_frequency: 8, speaker_switching: 6, answer_prediction_difficulty: 7, numerical_density: 8, syntactic_complexity: 7, accent_variation: 7 }
          }
        },
        {
          id: 4,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Total number of participants confirmed:",
          instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.",
          contextBefore: "Total Headcount: ",
          acceptedAnswers: ["30", "thirty"],
          distractors: [
            { choiceOrWord: "28", trapReason: "Initial headcount: 28 people registered at the start." },
            { choiceOrWord: "26", trapReason: "Intermediate calculation: 28 minus 2 withdrawals." }
          ],
          evidenceQuote: "We had twenty-eight sign up initially. Two withdrew last week due to exams, and four added on late. So that brings the final headcount to thirty.",
          listeningTechnique: "Be prepared for mental arithmetic distractors: initial numbers minus cancellations plus late additions.",
          difficultyProfile: {
            difficulty: 7.4,
            level: 'Hard',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 5, paraphrase_distance: 6, distractor_density: 8, correction_frequency: 7, speaker_switching: 6, answer_prediction_difficulty: 6, numerical_density: 9, syntactic_complexity: 7, accent_variation: 7 }
          }
        },
        {
          id: 5,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Vehicle reserved for group transport:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Vehicle type: ",
          acceptedAnswers: ["minibus", "a minibus", "the minibus", "mini-bus", "mini bus", "a mini-bus", "a mini bus", "minibuses"],
          distractors: [
            { choiceOrWord: "transit van", trapReason: "Previous inquiry: The student asked about a 12-seater transit van before their group expanded." },
            { choiceOrWord: "trailer", trapReason: "Trailer is the accessory, not the primary vehicle type." }
          ],
          evidenceQuote: "Yes, but since our group expanded, we'll need the minibus with luggage trailer.",
          listeningTechnique: "Distinguish between past inquiries and final choices triggered by changed circumstances.",
          difficultyProfile: {
            difficulty: 6.7,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 6, paraphrase_distance: 6, distractor_density: 7, correction_frequency: 7, speaker_switching: 7, answer_prediction_difficulty: 6, numerical_density: 6, syntactic_complexity: 6, accent_variation: 6 }
          }
        },
        {
          id: 6,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Equipment storage deposit fee:",
          instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
          contextBefore: "Deposit: £",
          acceptedAnswers: ["175", "175 pounds"],
          distractors: [
            { choiceOrWord: "250", trapReason: "Standard rate trap: 250 is the peak rate, but university partners pay the discounted 175." }
          ],
          evidenceQuote: "The peak seasonal rate is 250 pounds, but as an accredited tertiary partner, you receive our discounted rate of 175 pounds.",
          listeningTechnique: "Listen for qualifying clauses such as 'discounted rate' or 'partner concession' that supersede standard figures.",
          difficultyProfile: {
            difficulty: 7.0,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 6, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 6, speaker_switching: 6, answer_prediction_difficulty: 7, numerical_density: 8, syntactic_complexity: 7, accent_variation: 7 }
          }
        },
        {
          id: 7,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Chosen catering meal plan:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Catering Plan: ",
          acceptedAnswers: ["half-board", "half board"],
          distractors: [
            { choiceOrWord: "packed lunch", trapReason: "Suggested by coordinator for remote teams, but rejected by Jenna because they won't return until dusk." },
            { choiceOrWord: "full-board", trapReason: "Mentioned as an option tier, but not selected." }
          ],
          evidenceQuote: "Since our students will be on rocky shores until dusk, they won't make it to standard lunch hours. We'll definitely book the half-board option so dinner is prepared when we return.",
          listeningTechnique: "Identify reasons for rejection: the schedule conflicts with lunch, leaving half-board as the chosen plan.",
          difficultyProfile: {
            difficulty: 7.3,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 7, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 7, speaker_switching: 7, answer_prediction_difficulty: 7, numerical_density: 5, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 8,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Bursar's office street name for billing:",
          instruction: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          contextBefore: "Street: 29 ",
          acceptedAnswers: ["meadowbank way", "meadowbank"],
          distractors: [
            { choiceOrWord: "highfield terrace", trapReason: "Old address: 14 Highfield Terrace was the former biology annex before relocation." }
          ],
          evidenceQuote: "No, that's our old biology annex. The bursar's office relocated to 29 Meadowbank Way, postcode EH10 5DX.",
          listeningTechnique: "Watch for phrases indicating relocation or obsolete documentation ('that's our old annex').",
          difficultyProfile: {
            difficulty: 7.1,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 5, paraphrase_distance: 6, distractor_density: 8, correction_frequency: 8, speaker_switching: 7, answer_prediction_difficulty: 6, numerical_density: 7, syntactic_complexity: 6, accent_variation: 7 }
          }
        },
        {
          id: 9,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Postcode of the new bursar's office:",
          instruction: "Write ONE WORD ONLY AND/OR A NUMBER for each answer.",
          contextBefore: "Postcode: ",
          acceptedAnswers: ["eh10 5dx", "eh105dx"],
          distractors: [],
          evidenceQuote: "The bursar's office relocated to 29 Meadowbank Way, postcode EH10 5DX.",
          listeningTechnique: "Transcribe UK postcodes precisely with uppercase alphanumeric formatting.",
          difficultyProfile: {
            difficulty: 6.5,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 4, paraphrase_distance: 5, distractor_density: 5, correction_frequency: 5, speaker_switching: 6, answer_prediction_difficulty: 5, numerical_density: 8, syntactic_complexity: 5, accent_variation: 7 }
          }
        },
        {
          id: 10,
          sectionId: 1,
          type: 'gap_fill',
          prompt: "Compulsory personal equipment item each student must bring:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "Mandatory personal gear: ",
          acceptedAnswers: ["compass"],
          distractors: [
            { choiceOrWord: "emergency beacons", trapReason: "Provided by the lodge, not brought individually by students." },
            { choiceOrWord: "first aid", trapReason: "Provided by the lodge." }
          ],
          evidenceQuote: "Lastly, all students must carry personal waterproof boots and a compass, while the lodge provides emergency beacons and first aid kits.",
          listeningTechnique: "Differentiate between what must be provided by candidates vs. equipment furnished by the facility.",
          difficultyProfile: {
            difficulty: 7.0,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 6, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 6, speaker_switching: 6, answer_prediction_difficulty: 7, numerical_density: 4, syntactic_complexity: 7, accent_variation: 7 }
          }
        }
      ]
    },

    // SECTION 2
    {
      sectionNumber: 2,
      title: "Section 2: Maritime Heritage Centre Visitor Briefing",
      description: "A tour curator delivers an orientation talk about the development and layout of the historic maritime dockyards.",
      contextType: 'social_monologue',
      audioScript: [
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Welcome, everyone, to the King's Wharf Maritime Heritage Centre. My name is Julian Henderson. Before we explore the restoration slips, allow me to share our recent transition. Originally erected in 1842 as a commercial timber wharf, the compound was subsequently repurposed for naval munitions in the early 20th century, before local volunteers rescued it from demolition in 1994."
        },
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Our most recent architectural expansion—the glass-fronted atrium where we stand—was initially projected to open in November 2021. Due to severe supply delays with marine-grade steel, however, contractors missed that window. We hoped for Easter 2022, but the official ribbon-cutting finally took place in September 2022."
        },
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Now, regarding our funding framework: while the regional arts council contributed 35 percent of initial seed capital, and corporate sponsors pledged twenty percent, our sustaining operations rely overwhelmingly on private philanthropic bequests, which account for 45 percent of our annual budget."
        },
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "If you glance at the site map on your brochure: entering through the Main Gate on South Pier, immediately on your left is the Ticket Pavilion. Most visitors assume the Souvenir Shop is adjacent, but it has actually been moved across the courtyard directly beside the Historic Rigging Workshop."
        },
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Continuing north along the cobblestone esplanade, you will reach the central fountain. If you branch left toward the western jetty, you'll encounter the Steam Crane Exhibit. But if you take the right fork past the copper foundry, you arrive at our newest permanent feature: the Maritime Archive Library."
        },
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "To preserve historical integrity, photography is permitted in all open dry docks and outdoor exhibits. However, in the Admiralty Hall and the Rare Cartography Vault, all flash photography and tripod equipment are strictly prohibited to prevent ultraviolet degradation of century-old parchment."
        },
        {
          speaker: "Curator Henderson",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Finally, safety on the wooden quays: please heed the tide warning sirens. High tide occurs today at 3:45 PM, and the lower slipway will be closed twenty minutes prior to ensure no visitors are cut off by the swell."
        }
      ],
      questions: [
        {
          id: 11,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "The wharf was saved from demolition in which year?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) 1842",
            "B) 1920",
            "C) 1994"
          ],
          acceptedAnswers: ["C", "1994"],
          distractors: [
            { choiceOrWord: "A", trapReason: "Original construction year when it was built as a timber wharf." },
            { choiceOrWord: "B", trapReason: "Timeframe when it was repurposed for munitions." }
          ],
          evidenceQuote: "Originally erected in 1842 as a commercial timber wharf... before local volunteers rescued it from demolition in 1994.",
          listeningTechnique: "Listen for the verb 'rescued from demolition' rather than initial founding dates.",
          difficultyProfile: {
            difficulty: 7.2,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 7, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 6, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 8, syntactic_complexity: 7, accent_variation: 6 }
          }
        },
        {
          id: 12,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "When did the new glass-fronted atrium officially open?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) November 2021",
            "B) Easter 2022",
            "C) September 2022"
          ],
          acceptedAnswers: ["C", "September 2022"],
          distractors: [
            { choiceOrWord: "A", trapReason: "Initial projected opening date thwarted by steel supply delays." },
            { choiceOrWord: "B", trapReason: "Second anticipated window that was also missed." }
          ],
          evidenceQuote: "...contractors missed that window. We hoped for Easter 2022, but the official ribbon-cutting finally took place in September 2022.",
          listeningTechnique: "Look for the idiom 'official ribbon-cutting finally took place' to isolate the actual completion.",
          difficultyProfile: {
            difficulty: 7.6,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 7, paraphrase_distance: 8, distractor_density: 9, correction_frequency: 8, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 8, syntactic_complexity: 8, accent_variation: 6 }
          }
        },
        {
          id: 13,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Largest single funding source for annual operations:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Majority funding source: ",
          acceptedAnswers: ["philanthropic bequests", "bequests"],
          distractors: [
            { choiceOrWord: "arts council", trapReason: "Arts council provided 35% of seed capital, but not majority of ongoing operations." },
            { choiceOrWord: "corporate sponsors", trapReason: "Pledged only 20%." }
          ],
          evidenceQuote: "...our sustaining operations rely overwhelmingly on private philanthropic bequests, which account for 45 percent of our annual budget.",
          listeningTechnique: "Match the superlative 'overwhelmingly' or 'majority' to the 45% figure.",
          difficultyProfile: {
            difficulty: 7.8,
            level: 'Hard',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 9, correction_frequency: 6, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 8, syntactic_complexity: 8, accent_variation: 6 }
          }
        },
        {
          id: 14,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "The Souvenir Shop is located directly beside the:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Shop location: adjacent to ",
          acceptedAnswers: ["historic rigging workshop", "rigging workshop"],
          distractors: [
            { choiceOrWord: "ticket pavilion", trapReason: "Curator states visitors assume it is adjacent to the Ticket Pavilion, but it is across the courtyard." }
          ],
          evidenceQuote: "Most visitors assume the Souvenir Shop is adjacent [to the Ticket Pavilion], but it has actually been moved across the courtyard directly beside the Historic Rigging Workshop.",
          listeningTechnique: "Beware of false assumptions introduced by 'Most people assume X, but in reality Y'.",
          difficultyProfile: {
            difficulty: 7.7,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 7, paraphrase_distance: 8, distractor_density: 8, correction_frequency: 7, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 6 }
          }
        },
        {
          id: 15,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Facility reached by taking the right fork past the copper foundry:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "East wing facility: ",
          acceptedAnswers: ["maritime archive library", "archive library"],
          distractors: [
            { choiceOrWord: "steam crane exhibit", trapReason: "Located along the left branch toward the western jetty, not the right fork." }
          ],
          evidenceQuote: "If you branch left toward the western jetty, you'll encounter the Steam Crane Exhibit. But if you take the right fork past the copper foundry, you arrive at our newest permanent feature: the Maritime Archive Library.",
          listeningTechnique: "Follow spatial branching cues ('left fork' vs 'right fork past X').",
          difficultyProfile: {
            difficulty: 7.4,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 8, lexical_complexity: 7, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 6, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 4, syntactic_complexity: 7, accent_variation: 6 }
          }
        },
        {
          id: 16,
          sectionId: 2,
          type: 'multiple_choice',
          prompt: "In which two rooms is flash photography prohibited?",
          instruction: "Choose TWO letters, A-E.",
          options: [
            "A) Open dry docks",
            "B) Admiralty Hall",
            "C) Rare Cartography Vault",
            "D) Steam Crane Shed",
            "E) Ticket Pavilion"
          ],
          maxSelectable: 2,
          acceptedAnswers: ["B, C", "BC", "C, B"],
          distractors: [
            { choiceOrWord: "A", trapReason: "Explicitly permitted in all open dry docks." }
          ],
          evidenceQuote: "...in the Admiralty Hall and the Rare Cartography Vault, all flash photography and tripod equipment are strictly prohibited...",
          listeningTechnique: "Notice contrastive transition words like 'However, in [locations]... strictly prohibited'.",
          difficultyProfile: {
            difficulty: 7.5,
            level: 'Hard',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 6, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 4, syntactic_complexity: 8, accent_variation: 6 }
          }
        },
        {
          id: 17,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Reason for banning tripods in the Cartography Vault:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "To prevent: ",
          acceptedAnswers: ["ultraviolet degradation", "degradation"],
          distractors: [
            { choiceOrWord: "crowding", trapReason: "Generic reason not mentioned in audio." }
          ],
          evidenceQuote: "...strictly prohibited to prevent ultraviolet degradation of century-old parchment.",
          listeningTechnique: "Listen closely for causal clauses ('to prevent [noun phrase]').",
          difficultyProfile: {
            difficulty: 7.9,
            level: 'Hard',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 9, paraphrase_distance: 8, distractor_density: 6, correction_frequency: 5, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 3, syntactic_complexity: 8, accent_variation: 6 }
          }
        },
        {
          id: 18,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Century of origin of the parchment maps:",
          instruction: "Write ONE WORD OR A NUMBER for each answer.",
          contextBefore: "Parchments are ",
          contextAfter: " old",
          acceptedAnswers: ["century-old", "century", "100-year"],
          distractors: [],
          evidenceQuote: "...ultraviolet degradation of century-old parchment.",
          listeningTechnique: "Identify compound adjectives used in descriptions.",
          difficultyProfile: {
            difficulty: 7.2,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 7, paraphrase_distance: 7, distractor_density: 5, correction_frequency: 5, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 6, syntactic_complexity: 7, accent_variation: 6 }
          }
        },
        {
          id: 19,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "The lower slipway is barricaded how many minutes before high tide?",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Closed: ",
          contextAfter: " minutes prior to high tide",
          acceptedAnswers: ["20", "twenty"],
          distractors: [
            { choiceOrWord: "3:45", trapReason: "3:45 PM is the actual high tide time, not the warning minutes." }
          ],
          evidenceQuote: "High tide occurs today at 3:45 PM, and the lower slipway will be closed twenty minutes prior...",
          listeningTechnique: "Distinguish between absolute clock times (3:45 PM) and relative lead-time intervals (20 minutes).",
          difficultyProfile: {
            difficulty: 7.1,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 6, paraphrase_distance: 7, distractor_density: 7, correction_frequency: 6, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 8, syntactic_complexity: 7, accent_variation: 6 }
          }
        },
        {
          id: 20,
          sectionId: 2,
          type: 'gap_fill',
          prompt: "Warning system signaling incoming tide swells:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Visitors must heed: ",
          acceptedAnswers: ["warning sirens", "tide warning sirens", "sirens"],
          distractors: [
            { choiceOrWord: "flags", trapReason: "Plausible maritime trap not mentioned." }
          ],
          evidenceQuote: "please heed the tide warning sirens.",
          listeningTechnique: "Catch urgent safety nouns signaled by the verb 'heed'.",
          difficultyProfile: {
            difficulty: 6.9,
            level: 'Hard',
            factors: { speech_rate: 6, information_density: 7, lexical_complexity: 6, paraphrase_distance: 6, distractor_density: 6, correction_frequency: 5, speaker_switching: 1, answer_prediction_difficulty: 6, numerical_density: 4, syntactic_complexity: 6, accent_variation: 6 }
          }
        }
      ]
    },

    // SECTION 3 - TOUGH ACADEMIC DISCUSSION WITH INTERRUPTIONS & SELF-CORRECTIONS
    {
      sectionNumber: 3,
      title: "Section 3: Glaciology Seminar: Subglacial Meltwater Anomalies",
      description: "An intense academic tutorial between Professor Vance and research students Leo and Maya, dissecting contradictory glacier velocity data.",
      contextType: 'academic_discussion',
      audioScript: [
        {
          speaker: "Professor Vance",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Come in, Maya, Leo. Let's look over your comparative analysis of the Vatnajökull meltwater flow. Frankly, I noticed some striking discrepancies between your baseline models."
        },
        {
          speaker: "Leo",
          speakerRole: "speaker2",
          accent: "en-US",
          text: "Right, Professor. Well, I focused on basal sliding speed. My initial computation indicated an acceleration of eighteen percent over the three-year monitoring cycle."
        },
        {
          speaker: "Maya",
          speakerRole: "speaker3",
          accent: "en-AU",
          isInterruption: true,
          text: "Wait, sorry to interrupt Leo, but didn't you rely on the 2019 borehole telemetry? Because the sensor calibration at Station 4 was skewed by hydrostatic pressure."
        },
        {
          speaker: "Leo",
          speakerRole: "speaker2",
          accent: "en-US",
          text: "Actually, I caught that calibration drift. I recalibrated using radar interferometry, which knocked the estimate down to eleven percent."
        },
        {
          speaker: "Professor Vance",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Eleven percent is much closer to empirical observations. But Maya, in your methodology section, you attribute the surge primarily to subglacial cavity drainage. What empirical evidence supports that hypothesis over geothermal venting?"
        },
        {
          speaker: "Maya",
          speakerRole: "speaker3",
          accent: "en-AU",
          text: "Initially, I was convinced geothermal plumes were the catalyst because of the chemical isotope signatures in the runoff. But when we isolated the sulfur concentrations, they were virtually negligible. So that ruled out volcanic heating entirely."
        },
        {
          speaker: "Leo",
          speakerRole: "speaker2",
          accent: "en-US",
          isInterruption: true,
          text: "Though didn't Dr. Lindqvist argue in his Oslo paper that seasonal supraglacial lakes draining through moulins create identical hydrological surges?"
        },
        {
          speaker: "Maya",
          speakerRole: "speaker3",
          accent: "en-AU",
          text: "Yes, but Lindqvist's model assumes open moulin conduits in mid-autumn. Our thermal imaging proved those conduits froze shut by early October. So cavity storage was the only mechanism that matched the pressure buildup."
        },
        {
          speaker: "Professor Vance",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Good deduction. Now, what about the bedrock composition beneath Sector 7? Leo, your summary says basaltic bedrock, but your cross-section diagram is labeled porous sandstone."
        },
        {
          speaker: "Leo",
          speakerRole: "speaker2",
          accent: "en-US",
          text: "Oh, that's an embarrassing drafting error on my part! The diagram was imported from our previous Greenland study. The Vatnajökull basement is strictly basaltic. I'll correct the graphic before the symposium."
        },
        {
          speaker: "Professor Vance",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Please do. And how are we presenting our findings next Thursday? Maya, you suggested a twenty-minute slideshow followed by a question panel."
        },
        {
          speaker: "Maya",
          speakerRole: "speaker3",
          accent: "en-AU",
          text: "I did, but after reviewing the conference handbook yesterday, the keynote committee restricted graduate presentations to fifteen minutes maximum, with five minutes reserved strictly for referee cross-examination."
        },
        {
          speaker: "Leo",
          speakerRole: "speaker2",
          accent: "en-US",
          text: "In that case, we must cut our literature review section completely and begin straight with our velocity telemetry."
        },
        {
          speaker: "Professor Vance",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "I agree. Focus on the radar telemetry. Lastly, the supplementary research grant: the deadline was cited as the 1st of November in the department circular."
        },
        {
          speaker: "Maya",
          speakerRole: "speaker3",
          accent: "en-AU",
          text: "Actually, Professor, the faculty board extended it to the 12th of November because the online portal crashed."
        },
        {
          speaker: "Professor Vance",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Splendid. That buys us adequate breathing room to polish the manuscript."
        }
      ],
      questions: [
        {
          id: 21,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "What was Leo's final recalibrated figure for basal sliding acceleration?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) 18 percent",
            "B) 11 percent",
            "C) 14 percent"
          ],
          acceptedAnswers: ["B", "11 percent", "11%"],
          distractors: [
            { choiceOrWord: "A", trapReason: "Initial calculation before sensor drift correction." }
          ],
          evidenceQuote: "Actually, I caught that calibration drift. I recalibrated using radar interferometry, which knocked the estimate down to eleven percent.",
          listeningTechnique: "Listen through the interruption: Leo corrects his own initial 18% calculation down to 11%.",
          difficultyProfile: {
            difficulty: 8.5,
            level: 'Brutal',
            factors: { speech_rate: 8, information_density: 9, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 9, correction_frequency: 9, speaker_switching: 9, answer_prediction_difficulty: 8, numerical_density: 8, syntactic_complexity: 9, accent_variation: 8 }
          }
        },
        {
          id: 22,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Why did Maya eliminate geothermal venting as the cause of the surge?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) Meltwater temperatures dropped significantly",
            "B) Sulfur concentrations were virtually negligible",
            "C) Chemical isotope tests were inconclusive"
          ],
          acceptedAnswers: ["B"],
          distractors: [
            { choiceOrWord: "C", trapReason: "Chemical isotopes were tested, but it was the specific absence of sulfur that disproved geothermal plumes." }
          ],
          evidenceQuote: "...when we isolated the sulfur concentrations, they were virtually negligible. So that ruled out volcanic heating entirely.",
          listeningTechnique: "Identify the definitive disproving factor ('ruled out volcanic heating entirely').",
          difficultyProfile: {
            difficulty: 8.7,
            level: 'Brutal',
            factors: { speech_rate: 8, information_density: 9, lexical_complexity: 9, paraphrase_distance: 9, distractor_density: 8, correction_frequency: 8, speaker_switching: 8, answer_prediction_difficulty: 9, numerical_density: 5, syntactic_complexity: 9, accent_variation: 8 }
          }
        },
        {
          id: 23,
          sectionId: 3,
          type: 'multiple_choice',
          prompt: "Why was Dr. Lindqvist's moulin drainage model inapplicable to Vatnajökull?",
          instruction: "Choose the correct letter, A, B, or C.",
          options: [
            "A) The glacier surface lacked supraglacial lakes",
            "B) Conduit passages froze shut by early October",
            "C) Hydrological surges occurred only in mid-winter"
          ],
          acceptedAnswers: ["B"],
          distractors: [
            { choiceOrWord: "A", trapReason: "Lakes were present; the failure point was conduit freezing." }
          ],
          evidenceQuote: "Our thermal imaging proved those conduits froze shut by early October. So cavity storage was the only mechanism...",
          listeningTechnique: "Track academic counter-arguments where a published model's assumption is disproven by empirical telemetry.",
          difficultyProfile: {
            difficulty: 8.8,
            level: 'Brutal',
            factors: { speech_rate: 8, information_density: 9, lexical_complexity: 9, paraphrase_distance: 9, distractor_density: 8, correction_frequency: 8, speaker_switching: 8, answer_prediction_difficulty: 9, numerical_density: 6, syntactic_complexity: 9, accent_variation: 8 }
          }
        },
        {
          id: 24,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Actual geological bedrock of the Vatnajökull basement:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "True bedrock: ",
          acceptedAnswers: ["basaltic", "basalt"],
          distractors: [
            { choiceOrWord: "sandstone", trapReason: "Drafting error: The diagram accidentally had 'porous sandstone' from a Greenland file." }
          ],
          evidenceQuote: "The diagram was imported from our previous Greenland study. The Vatnajökull basement is strictly basaltic.",
          listeningTechnique: "Catch explicit self-corrections of drafting mistakes ('an embarrassing drafting error on my part').",
          difficultyProfile: {
            difficulty: 8.4,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 9, correction_frequency: 9, speaker_switching: 8, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 8 }
          }
        },
        {
          id: 25,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Location from which the incorrect sandstone diagram was copied:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "Imported from: ",
          acceptedAnswers: ["greenland"],
          distractors: [
            { choiceOrWord: "vatnajokull", trapReason: "Vatnajökull is the current study subject, not the origin of the wrong diagram." }
          ],
          evidenceQuote: "The diagram was imported from our previous Greenland study.",
          listeningTechnique: "Isolate the origin of erroneous material when speakers explain their mistakes.",
          difficultyProfile: {
            difficulty: 8.0,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 7, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 9, speaker_switching: 7, answer_prediction_difficulty: 7, numerical_density: 4, syntactic_complexity: 8, accent_variation: 8 }
          }
        },
        {
          id: 26,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Maximum allowable duration for graduate presentations:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Presentation limit: ",
          contextAfter: " minutes",
          acceptedAnswers: ["15", "fifteen"],
          distractors: [
            { choiceOrWord: "20", trapReason: "Maya's initial proposal was 20 minutes before checking the handbook rules." }
          ],
          evidenceQuote: "I did, but after reviewing the conference handbook yesterday, the keynote committee restricted graduate presentations to fifteen minutes maximum...",
          listeningTechnique: "Notice when student proposals are overruled by institutional or conference guidelines.",
          difficultyProfile: {
            difficulty: 8.2,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 8, correction_frequency: 8, speaker_switching: 8, answer_prediction_difficulty: 8, numerical_density: 8, syntactic_complexity: 8, accent_variation: 8 }
          }
        },
        {
          id: 27,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Time allocated exclusively for referee questions:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Cross-examination: ",
          contextAfter: " minutes",
          acceptedAnswers: ["5", "five"],
          distractors: [],
          evidenceQuote: "...with five minutes reserved strictly for referee cross-examination.",
          listeningTechnique: "Separate the lecture duration (15 min) from the Q&A cross-examination duration (5 min).",
          difficultyProfile: {
            difficulty: 7.9,
            level: 'Hard',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 7, paraphrase_distance: 7, distractor_density: 6, correction_frequency: 6, speaker_switching: 7, answer_prediction_difficulty: 7, numerical_density: 8, syntactic_complexity: 8, accent_variation: 8 }
          }
        },
        {
          id: 28,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Section of the presentation to be completely eliminated:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Eliminated segment: ",
          acceptedAnswers: ["literature review"],
          distractors: [
            { choiceOrWord: "velocity telemetry", trapReason: "Velocity telemetry is what they will focus on, not what they will cut." }
          ],
          evidenceQuote: "In that case, we must cut our literature review section completely and begin straight with our velocity telemetry.",
          listeningTechnique: "Distinguish between what is removed ('cut completely') vs. what is retained ('begin straight with').",
          difficultyProfile: {
            difficulty: 8.3,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 8, correction_frequency: 7, speaker_switching: 8, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 8 }
          }
        },
        {
          id: 29,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Revised submission deadline for the research grant:",
          instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
          contextBefore: "Extended date: ",
          contextAfter: " November",
          acceptedAnswers: ["12", "12th", "12 November", "12th November"],
          distractors: [
            { choiceOrWord: "1", trapReason: "1st of November was the original deadline stated in the department circular." }
          ],
          evidenceQuote: "Actually, Professor, the faculty board extended it to the 12th of November because the online portal crashed.",
          listeningTechnique: "Listen for the polite correction of the professor by the student ('Actually, Professor, ... extended it to').",
          difficultyProfile: {
            difficulty: 8.6,
            level: 'Brutal',
            factors: { speech_rate: 8, information_density: 8, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 9, correction_frequency: 9, speaker_switching: 9, answer_prediction_difficulty: 8, numerical_density: 9, syntactic_complexity: 8, accent_variation: 8 }
          }
        },
        {
          id: 30,
          sectionId: 3,
          type: 'gap_fill',
          prompt: "Cause of the grant deadline extension:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Reason for extension: ",
          acceptedAnswers: ["online portal crashed", "portal crashed"],
          distractors: [],
          evidenceQuote: "...extended it to the 12th of November because the online portal crashed.",
          listeningTechnique: "Listen for the causal conjunction 'because' following the revised date.",
          difficultyProfile: {
            difficulty: 8.1,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 7, paraphrase_distance: 8, distractor_density: 6, correction_frequency: 7, speaker_switching: 8, answer_prediction_difficulty: 7, numerical_density: 4, syntactic_complexity: 8, accent_variation: 8 }
          }
        }
      ]
    },

    // SECTION 4 - ADVANCED ACADEMIC MONOLOGUE
    {
      sectionNumber: 4,
      title: "Section 4: Biomimetic Engineering in High-Altitude Architecture",
      description: "An advanced university lecture analyzing how structural engineers replicate biological organisms to resist aerodynamic shear stress.",
      contextType: 'academic_lecture',
      audioScript: [
        {
          speaker: "Lecturer Davies",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Good morning. In today's module on structural resilience, we explore biomimetic adaptations in supertall architecture. When designing skyscrapers exceeding 400 meters, gravitational loads become secondary compared to aerodynamic shear forces, specifically vortex shedding. As high-velocity wind encounters a sheer planar facade, alternating low-pressure vortices detach on opposing flanks, inducing destructive transverse oscillations."
        },
        {
          speaker: "Lecturer Davies",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Historically, civil engineers relied on massive tuned mass dampers—multi-ton pendulums suspended in building crowns. Modern design, however, mimics organismal morphology. Take the hexactinellid sponge, Euplectella aspergillum, colloquially termed the Venus' flower basket. Thriving in benthic ocean trenches subject to turbulent currents, its skeletal lattice consists of square grid frameworks reinforced by diagonal helical struts."
        },
        {
          speaker: "Lecturer Davies",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "Finite element modeling demonstrates that this dual-diagonal reinforcement dissipates stress by over forty percent compared to traditional unreinforced orthogonal skeletons. Furthermore, the external surface possesses microscopic ridge spiraling that disrupts fluid boundary layers, transforming turbulent drag into laminar bypass."
        },
        {
          speaker: "Lecturer Davies",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "A terrestrial parallel is found in bamboo culms. Rather than exhibiting uniform material density throughout, bamboo culms display functionally graded vascular bundles. The highest concentration of stiff lignin fibers occurs at the exterior periphery, while the interior core is spongy and ductile. This outward concentration maximizes the second moment of area, resisting violent bending moments without adding redundant weight."
        },
        {
          speaker: "Lecturer Davies",
          speakerRole: "speaker1",
          accent: "en-GB",
          text: "When translated into high-rise fabrication, this principle yielded the diagrid exoskeleton. By repositioning primary structural steel from internal elevator cores to the external perimeter, engineers achieved a thirty percent reduction in total steel consumption, while simultaneously eliminating internal structural columns to maximize usable floor area."
        }
      ],
      questions: [
        {
          id: 31,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Primary threat to buildings exceeding 400 meters:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Major force: ",
          acceptedAnswers: ["aerodynamic shear", "shear forces", "aerodynamic shear forces"],
          distractors: [
            { choiceOrWord: "gravitational loads", trapReason: "Gravitational loads become secondary; aerodynamic shear is primary." }
          ],
          evidenceQuote: "When designing skyscrapers exceeding 400 meters, gravitational loads become secondary compared to aerodynamic shear forces...",
          listeningTechnique: "Recognize lexical comparative indicators: 'X becomes secondary compared to Y'.",
          difficultyProfile: {
            difficulty: 8.5,
            level: 'Brutal',
            factors: { speech_rate: 8, information_density: 9, lexical_complexity: 9, paraphrase_distance: 9, distractor_density: 8, correction_frequency: 5, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 7, syntactic_complexity: 9, accent_variation: 7 }
          }
        },
        {
          id: 32,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Destructive transverse movements caused by alternating low-pressure vortices:",
          instruction: "Write ONE WORD ONLY for each answer.",
          contextBefore: "Induces transverse: ",
          acceptedAnswers: ["oscillations", "oscillation"],
          distractors: [],
          evidenceQuote: "...alternating low-pressure vortices detach on opposing flanks, inducing destructive transverse oscillations.",
          listeningTechnique: "Match the prompt's grammatical collocations ('inducing transverse [noun]').",
          difficultyProfile: {
            difficulty: 8.6,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 9, lexical_complexity: 10, paraphrase_distance: 8, distractor_density: 5, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 9, numerical_density: 4, syntactic_complexity: 9, accent_variation: 7 }
          }
        },
        {
          id: 33,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Traditional mechanical stabilization device historically suspended in building crowns:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Traditional stabilizer: ",
          acceptedAnswers: ["tuned mass dampers", "mass dampers", "tuned mass damper"],
          distractors: [],
          evidenceQuote: "Historically, civil engineers relied on massive tuned mass dampers—multi-ton pendulums suspended in building crowns.",
          listeningTechnique: "Note historical retrospectives introduced by 'Historically, engineers relied on...'.",
          difficultyProfile: {
            difficulty: 8.2,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 9, paraphrase_distance: 8, distractor_density: 6, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 34,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Common name of the marine sponge Euplectella aspergillum:",
          instruction: "Write NO MORE THAN THREE WORDS for each answer.",
          contextBefore: "Known as: ",
          acceptedAnswers: ["venus' flower basket", "venus flower basket"],
          distractors: [],
          evidenceQuote: "Take the hexactinellid sponge, Euplectella aspergillum, colloquially termed the Venus' flower basket.",
          listeningTechnique: "Listen for signposts signaling informal/common nomenclature: 'colloquially termed'.",
          difficultyProfile: {
            difficulty: 8.0,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 9, paraphrase_distance: 7, distractor_density: 5, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 4, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 35,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Skeletal struts reinforcing the sponge's square grid:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Reinforced by: ",
          acceptedAnswers: ["diagonal helical struts", "helical struts"],
          distractors: [],
          evidenceQuote: "...its skeletal lattice consists of square grid frameworks reinforced by diagonal helical struts.",
          listeningTechnique: "Transcribe precise geometric and structural descriptors.",
          difficultyProfile: {
            difficulty: 8.4,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 9, lexical_complexity: 9, paraphrase_distance: 8, distractor_density: 5, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 36,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Percentage by which dual-diagonal reinforcement dissipates stress:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Dissipates stress by over: ",
          contextAfter: " %",
          acceptedAnswers: ["40", "forty"],
          distractors: [
            { choiceOrWord: "30", trapReason: "30 percent is the later steel consumption reduction figure." }
          ],
          evidenceQuote: "Finite element modeling demonstrates that this dual-diagonal reinforcement dissipates stress by over forty percent...",
          listeningTechnique: "Separate biological stress reduction percentages (40%) from structural fabrication steel savings (30%).",
          difficultyProfile: {
            difficulty: 8.3,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 8, distractor_density: 8, correction_frequency: 5, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 8, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 37,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Dense structural fibers found at the exterior periphery of bamboo:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Outer edge material: ",
          acceptedAnswers: ["lignin fibers", "lignin"],
          distractors: [],
          evidenceQuote: "The highest concentration of stiff lignin fibers occurs at the exterior periphery...",
          listeningTechnique: "Pair anatomical locations ('exterior periphery') with the corresponding organic constituents.",
          difficultyProfile: {
            difficulty: 8.5,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 9, paraphrase_distance: 8, distractor_density: 6, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 38,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Mechanical quality of bamboo's inner core:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Inner core properties: spongy and ",
          acceptedAnswers: ["ductile"],
          distractors: [],
          evidenceQuote: "...while the interior core is spongy and ductile.",
          listeningTechnique: "Listen for coordinate adjectives joined by 'and'.",
          difficultyProfile: {
            difficulty: 8.7,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 9, paraphrase_distance: 8, distractor_density: 5, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 3, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 39,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Architectural system born from bamboo's perimeter distribution:",
          instruction: "Write NO MORE THAN TWO WORDS for each answer.",
          contextBefore: "Resulting structural frame: ",
          acceptedAnswers: ["diagrid exoskeleton", "diagrid"],
          distractors: [],
          evidenceQuote: "When translated into high-rise fabrication, this principle yielded the diagrid exoskeleton.",
          listeningTechnique: "Identify engineering innovation terms marked by 'yielded the [technology]'.",
          difficultyProfile: {
            difficulty: 8.5,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 9, paraphrase_distance: 8, distractor_density: 6, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 8, numerical_density: 4, syntactic_complexity: 8, accent_variation: 7 }
          }
        },
        {
          id: 40,
          sectionId: 4,
          type: 'gap_fill',
          prompt: "Reduction achieved in total steel consumption:",
          instruction: "Write ONE NUMBER ONLY for each answer.",
          contextBefore: "Steel reduction: ",
          contextAfter: " %",
          acceptedAnswers: ["30", "thirty"],
          distractors: [
            { choiceOrWord: "40", trapReason: "40 was the sponge stress dissipation figure earlier." }
          ],
          evidenceQuote: "...engineers achieved a thirty percent reduction in total steel consumption...",
          listeningTechnique: "Retain specific statistical reductions at the conclusion of a complex lecture.",
          difficultyProfile: {
            difficulty: 8.1,
            level: 'Brutal',
            factors: { speech_rate: 7, information_density: 8, lexical_complexity: 8, paraphrase_distance: 7, distractor_density: 8, correction_frequency: 4, speaker_switching: 1, answer_prediction_difficulty: 7, numerical_density: 8, syntactic_complexity: 8, accent_variation: 7 }
          }
        }
      ]
    }
  ]
};
