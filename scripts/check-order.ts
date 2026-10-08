import { getTestById } from '../src/data/testRepository.js';

console.log('Auditing questions and audio synchronization across tests...');

let issuesCount = 0;

for (let id = 1; id <= 100; id++) {
  const test = getTestById(id);

  for (const sec of test.sections) {
    const fullAudio = sec.audioScript.map(t => t.text).join(' ');

    let lastTurnIdx = -1;

    for (const q of sec.questions) {
      // Find which audio turn contains the evidenceQuote or primary acceptedAnswer
      let foundTurnIdx = -1;

      // 1. Try finding by evidence quote snippet
      if (q.evidenceQuote) {
        const cleanSnippet = q.evidenceQuote
          .replace(/^\.\.\./, '')
          .replace(/\.\.\.$/, '')
          .replace(/[\[\]]/g, '')
          .trim()
          .slice(0, 35)
          .toLowerCase();

        foundTurnIdx = sec.audioScript.findIndex(t => t.text.toLowerCase().includes(cleanSnippet));
      }

      // 2. If not found, try accepted answers (whole word match)
      if (foundTurnIdx === -1) {
        for (const ans of q.acceptedAnswers) {
          const ansLower = ans.toLowerCase();
          foundTurnIdx = sec.audioScript.findIndex(t => {
            const tLower = t.text.toLowerCase().replace(/[-–—]/g, ' ');
            const regex = new RegExp(`\\b${ansLower.replace(/[-–—]/g, ' ')}\\b`, 'i');
            return regex.test(tLower) || tLower.includes(ansLower);
          });
          if (foundTurnIdx !== -1) break;
        }
      }

      if (foundTurnIdx === -1) {
        console.log(`  [UNSPOKEN / NOT FOUND] Sec ${sec.sectionNumber} Q${q.id}: "${q.acceptedAnswers[0]}" (quote: "${q.evidenceQuote?.slice(0, 40)}")`);
        issuesCount++;
      } else {
        if (foundTurnIdx < lastTurnIdx) {
          console.log(`  [OUT OF ORDER] Sec ${sec.sectionNumber} Q${q.id} in Turn ${foundTurnIdx + 1} (previous was Turn ${lastTurnIdx + 1}). Answer: "${q.acceptedAnswers[0]}"`);
          issuesCount++;
        }
        lastTurnIdx = foundTurnIdx;
      }
    }
  }
}

console.log(`\nAudit completed with ${issuesCount} turn-level chronological / unspoken issues detected.`);
