// Helper to convert spoken English words to numbers and clean IELTS answers
const NUMBER_WORDS: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15',
  sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20',
  thirty: '30', forty: '40', fifty: '50', sixty: '60', seventy: '70',
  eighty: '80', ninety: '90', hundred: '100', thousand: '1000'
};

const MONTHS: Record<string, string> = {
  january: 'January', february: 'February', march: 'March', april: 'April',
  may: 'May', june: 'June', july: 'July', august: 'August',
  september: 'September', october: 'October', november: 'November', december: 'December'
};

export function normalizeSpokenIELTSAnswer(spokenText: string): string {
  let cleaned = spokenText.trim().toLowerCase();

  // Remove common verbal disfluencies
  cleaned = cleaned.replace(/\b(um|uh|er|ah|like|i think|maybe|the answer is)\b/gi, '').trim();

  // Remove trailing periods
  cleaned = cleaned.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ').replace(/\s+/g, ' ').trim();

  const words = cleaned.split(' ');
  const processedWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check month
    if (MONTHS[word]) {
      processedWords.push(MONTHS[word]);
      continue;
    }

    // Check compound numbers like "twenty five" -> 25
    if (['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'].includes(word) && i + 1 < words.length && NUMBER_WORDS[words[i + 1]]) {
      const tens = parseInt(NUMBER_WORDS[word]);
      const ones = parseInt(NUMBER_WORDS[words[i + 1]]);
      if (!isNaN(tens) && !isNaN(ones)) {
        processedWords.push(String(tens + ones));
        i++; // skip next
        continue;
      }
    }

    // Check single number word
    if (NUMBER_WORDS[word]) {
      processedWords.push(NUMBER_WORDS[word]);
      continue;
    }

    processedWords.push(word);
  }

  return processedWords.join(' ').trim();
}

export class MicrophoneService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    onResult: (text: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError('Microphone speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return false;
    }

    if (this.isListening) {
      this.stop();
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const normalized = normalizeSpokenIELTSAnswer(transcript);
      onResult(normalized);
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError(event.error === 'not-allowed' ? 'Microphone permission denied.' : `Microphone error: ${event.error}`);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e: any) {
      this.isListening = false;
      onError(e.message || 'Could not start microphone');
      return false;
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }
}

export const micService = new MicrophoneService();
