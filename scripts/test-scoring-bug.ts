import { checkAnswerMatch } from '../src/services/scoringEngine.js';

console.log('Testing potential false positives in scoring engine:');
console.log('User "0" vs "40":', checkAnswerMatch('0', ['40']));
console.log('User "5" vs "15":', checkAnswerMatch('5', ['15']));
console.log('User "8" vs "18":', checkAnswerMatch('8', ['18']));
console.log('User "stone" vs "sandstone":', checkAnswerMatch('stone', ['sandstone']));
console.log('User "1341" vs "RC-1341":', checkAnswerMatch('1341', ['RC-1341']));
console.log('User "RC1341" vs "1341":', checkAnswerMatch('RC1341', ['1341']));
console.log('User "minibus" vs "minibus":', checkAnswerMatch('minibus', ['minibus']));
console.log('User "mini bus" vs "minibus":', checkAnswerMatch('mini bus', ['minibus']));
