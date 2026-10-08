# IELTS Computer-Delivered (CD) Listening Simulator

An authentic, institutional-grade **Computer-Delivered IELTS (CD-IELTS) Listening Simulator** conforming to the official Cambridge English / IDP / British Council 2026 test specifications.

Live Application: **[https://ravindra8008.github.io/IELTS-CD-SIMULATOR/](https://ravindra8008.github.io/IELTS-CD-SIMULATOR/)**

---

## 🏛️ Official Test Structure & Format

| Section | IELTS Context & Content | Official Cambridge Format | Question Types in Simulator |
| :--- | :--- | :--- | :--- |
| **Part 1** | Everyday Social Conversation (Q1–Q10) | Form / Note / Table Completion | **Gap-Fill (1 Word and/or Number)** |
| **Part 2** | Local Facility / Orientation Monologue (Q11–Q20) | Map Labelling, Matching, Multiple Choice (A/B/C), Multi-Select (Choose 2), Facility Notes | **Map / Plan Labelling**<br>**Matching Features**<br>**MCQ Single & Multi-Select**<br>**Notes Completion** |
| **Part 3** | Multi-Speaker Academic Discussion (Q21–Q30) | Academic Debate, Methodological Review, Matching Classifications, Notes Completion | **Academic MCQ (A/B/C)**<br>**Multi-Select (Choose 2)**<br>**Matching Opinions**<br>**Flow-Chart / Notes Completion** |
| **Part 4** | Academic Monologue Lecture (Q31–Q40) | University Lecture Summary / Structured Subheading Notes | **Gap-Fill (ONE WORD ONLY)** |

---

## 🎯 Supported Question Types

The simulator dynamically implements all six official IELTS Listening question formats:

1. **Multiple Choice (Single Choice)**: Choose the correct answer from options A, B, or C.
2. **Multiple Choice (Multi-Select)**: Choose TWO letters from options A–E.
3. **Labeling a Diagram or Map (`map_labelling`)**:
   - Interactive vector architectural layouts and site plans.
   - Cardinal directions (Compass Rose: North, South, East, West).
   - Clickable location markers (`A`–`G`) placed across paths, wings, and courtyards.
4. **Matching Features & Classifications (`matching`)**:
   - Classification panels with categories (A, B, C, D).
   - Match target facilities, policies, or research methodologies to their respective category.
5. **Form, Note, Table, or Flow Chart Completion (`gap_fill`)**:
   - Real-time word-limit validation (*"NO MORE THAN TWO WORDS AND/OR A NUMBER"*).
   - Contextual before/after sentence fragments matching official Cambridge layout.
6. **Sentence Completion & Short Answer Questions**:
   - Precision grammatical and orthographic tolerance (including UK/US spelling equivalence: *colour/color*, *centre/center*, etc.).

---

## 💾 Test State Persistence & Offline Auto-Save

- **Continuous Auto-Save**: Every keystroke, radio selection, and review flag is automatically saved to local browser storage (`localStorage`).
- **Completed Test Retention**: Submitting a test permanently saves the raw score, band score, section breakdown, and full candidate answer sheet into the **Candidate Attempt History**.
- **Accidental Refresh Protection**: Reloading or reopening the browser instantly restores your in-progress draft or completed test diagnostics without losing data.
- **One-Click Restart / Retake**: Clear previous answers and timer to practice the test fresh whenever desired.

---

## 📊 Official Cambridge Band Score Conversion

Your raw score (correct answers out of 40) is automatically converted to the official 0–9 IELTS band scale:

| Band Score | Correct Answers (out of 40) | Skill Level Description |
| :---: | :---: | :--- |
| **9.0** | 39 – 40 | Expert User |
| **8.5** | 37 – 38 | Very Good User (Upper) |
| **8.0** | 35 – 36 | Very Good User |
| **7.5** | 32 – 34 | Good User (Upper) |
| **7.0** | 30 – 31 | Good User |
| **6.5** | 26 – 29 | Competent User (Upper) |
| **6.0** | 23 – 25 | Competent User |
| **5.5** | 18 – 22 | Modest User (Upper) |
| **5.0** | 16 – 17 | Modest User |
| **4.5** | 13 – 15 | Intermittent User (Upper) |
| **4.0** | 10 – 12 | Intermittent User |
| **3.5** | 8 – 9 | Extremely Limited User |
| **3.0** | 6 – 7 | Extremely Limited User |
| **2.5** | 4 – 5 | Intermittent User |
| **2.0** | 2 – 3 | Very Limited User |
| **1.0** | 0 – 1 | Non-User |

---

## ⚡ Computer-Delivered (CD-IELTS) Features

- **Strict Chronological Audio Synchronization**: Every question appears in the exact order it is spoken in the dialogue recordings.
- **Official 30-Minute Countdown Timer**: Includes Cambridge standard hide/show clock controls.
- **Audio Speed Calibration**: Cycle real-time audio playback pacing (`0.85x`, `0.95x`, `1.0x`) for tailored training.
- **High-Contrast Accessibility Mode**: Toggle official Cambridge high-contrast display (yellow on black) with one click.
- **Font Size Scaling**: Cycle text sizes (`1.0x Standard`, `1.2x Large`, `1.4x Extra Large`).
- **Review / Flagging Palette**: Check the `[Review]` box to flag questions for final review, matching the real computer-delivered interface.
- **Speech-to-Text Dictation**: Practice answering via microphone input using the browser Web Speech API.
- **Comprehensive Diagnostic Reports**: Post-test analytics detailing raw score, band score, distractor traps, and Cambridge listening techniques.

---

## 🛠️ Development & Build

### Requirements
- Node.js (v18+)
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/RAVINDRA8008/IELTS-CD-SIMULATOR.git
cd IELTS-CD-SIMULATOR

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Deployment

```bash
# Build production bundle
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
```

### Automated Verification Suite

```bash
# Verify test structure and score thresholds
npx tsx scripts/verify-tests.ts

# Audit question-audio chronological synchronization
npx tsx scripts/check-order.ts

# Inspect question type distribution across all 100 tests
npx tsx scripts/inspect-question-types.ts
```

---

## 📜 License
MIT License. Built for rigorous IELTS preparation and computer-delivered exam simulation.
