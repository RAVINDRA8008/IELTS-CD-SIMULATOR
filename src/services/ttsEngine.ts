import { AudioTurn } from '../types/test';

export interface TTSState {
  status: 'idle' | 'playing' | 'paused' | 'error';
  currentTurnIndex: number;
  totalTurns: number;
  currentSpeaker: string;
  errorMessage?: string;
}

export type TTSProgressCallback = (state: TTSState) => void;

class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isCancelled: boolean = false;
  private pauseTimer: any = null;
  private heartbeatTimer: any = null;
  private watchdogTimer: any = null;
  private turns: AudioTurn[] = [];
  private currentIndex: number = 0;
  private onProgress: TTSProgressCallback | null = null;
  private onComplete: (() => void) | null = null;
  private onError: ((err: string) => void) | null = null;
  private volume: number = 1.0;
  private playbackSpeedMultiplier: number = 0.95; // Slightly slower, authentic IELTS cadence

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    this.voices = this.synth.getVoices();
    return this.voices;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(v => v.lang.startsWith('en'));
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public setPlaybackSpeed(speed: number) {
    this.playbackSpeedMultiplier = Math.max(0.75, Math.min(1.25, speed));
  }

  public getPlaybackSpeed(): number {
    return this.playbackSpeedMultiplier;
  }

  private pickVoiceForRole(role: 'speaker1' | 'speaker2' | 'speaker3', accent?: string): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const gbVoices = englishVoices.filter(v => v.lang.includes('GB') || v.lang.includes('uk'));
    const auVoices = englishVoices.filter(v => v.lang.includes('AU'));
    const usVoices = englishVoices.filter(v => v.lang.includes('US'));

    let selectedVoice: SpeechSynthesisVoice | null = null;
    let pitch = 1.0;
    let rate = 1.0; // IELTS conversational tempo

    switch (role) {
      case 'speaker1':
        selectedVoice = gbVoices[0] || englishVoices[0] || null;
        pitch = 0.96;
        rate = 0.98;
        break;
      case 'speaker2':
        selectedVoice = (gbVoices.length > 1 ? gbVoices[1] : null) || auVoices[0] || englishVoices[1] || englishVoices[0] || null;
        pitch = 1.12;
        rate = 1.01;
        break;
      case 'speaker3':
        selectedVoice = usVoices[0] || auVoices[0] || (englishVoices.length > 2 ? englishVoices[2] : null) || null;
        pitch = 0.88;
        rate = 0.97;
        break;
    }

    if (accent) {
      const matched = englishVoices.find(v => v.lang.toLowerCase().includes(accent.toLowerCase().replace('en-', '')));
      if (matched) selectedVoice = matched;
    }

    return { voice: selectedVoice, pitch, rate };
  }

  // Chrome speech freeze fix (ensures paused state is resumed without aborting speech)
  private startChromeHeartbeat() {
    this.stopChromeHeartbeat();
    if (!this.synth) return;

    this.heartbeatTimer = setInterval(() => {
      if (this.synth && this.synth.paused && !this.isCancelled) {
        this.synth.resume();
      }
    }, 2500);
  }

  private stopChromeHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private clearWatchdog() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  public playSection(
    turns: AudioTurn[],
    onProgress: TTSProgressCallback,
    onComplete: () => void,
    onError: (err: string) => void
  ) {
    this.stop();
    this.turns = turns;
    this.currentIndex = 0;
    this.isCancelled = false;
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.onError = onError;

    if (!this.synth) {
      onError('Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (this.voices.length === 0) {
      this.loadVoices();
    }

    this.startChromeHeartbeat();
    this.playTurn(0);
  }

  private playTurn(index: number) {
    if (this.isCancelled) return;
    this.clearWatchdog();

    if (index >= this.turns.length) {
      this.stopChromeHeartbeat();
      this.onProgress?.({
        status: 'idle',
        currentTurnIndex: this.turns.length,
        totalTurns: this.turns.length,
        currentSpeaker: '',
      });
      this.onComplete?.();
      return;
    }

    this.currentIndex = index;
    const turn = this.turns[index];
    const { voice, pitch, rate } = this.pickVoiceForRole(turn.speakerRole, turn.accent);

    this.onProgress?.({
      status: 'playing',
      currentTurnIndex: index + 1,
      totalTurns: this.turns.length,
      currentSpeaker: turn.speaker,
    });

    const cleanText = turn.text.replace(/\[pause\s*[\d.]+s?\]/gi, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // CRITICAL: Prevent Chrome Garbage Collection Bug
    // Chrome drops utterances after 10-15s if not pinned to a global object
    (window as any).__currentActiveUtterance = utterance;

    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = Math.max(0.7, Math.min(1.3, rate * this.playbackSpeedMultiplier));
    utterance.volume = this.volume;

    let hasEnded = false;

    const advanceToNext = (pauseSeconds: number) => {
      if (hasEnded || this.isCancelled) return;
      hasEnded = true;
      this.clearWatchdog();

      this.pauseTimer = setTimeout(() => {
        if (!this.isCancelled) {
          this.playTurn(index + 1);
        }
      }, pauseSeconds * 1000);
    };

    utterance.onend = () => {
      // Natural IELTS conversational pacing: give candidate breathing room to write down answers
      const pauseSec = turn.pauseAfterSeconds ?? (turn.isInterruption ? 0.4 : 1.4);
      advanceToNext(pauseSec);
    };

    utterance.onerror = (e) => {
      if (this.isCancelled) return;
      if (e.error === 'interrupted' || e.error === 'canceled') {
        // Recover and advance if the browser interrupted speech without an explicit user cancellation
        console.warn('TTS utterance interrupted by browser audio engine, auto-advancing:', e.error);
        advanceToNext(0.4);
        return;
      }
      console.warn('TTS utterance error:', e.error);
      advanceToNext(0.5);
    };

    // Watchdog Timer: Protect against silent browser freeze without triggering during legitimate speech
    const wordCount = cleanText.split(/\s+/).length;
    // Calculate expected audio duration (avg ~2.0 words per sec) + 12 second generous buffer
    const maxExpectedSeconds = Math.max(8, Math.ceil(wordCount / 1.8) + 12);

    this.watchdogTimer = setTimeout(() => {
      if (!hasEnded && !this.isCancelled) {
        console.warn(`TTS Watchdog triggered on turn ${index + 1}: speech timed out in browser, advancing.`);
        advanceToNext(0.3);
      }
    }, maxExpectedSeconds * 1000);

    try {
      if (this.synth?.paused) {
        this.synth.resume();
      }
      this.synth?.speak(utterance);
    } catch (err: any) {
      this.onError?.(err?.message || 'Speech synthesis failed to execute.');
    }
  }

  public pause() {
    this.clearWatchdog();
    this.stopChromeHeartbeat();
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.onProgress?.({
        status: 'paused',
        currentTurnIndex: this.currentIndex + 1,
        totalTurns: this.turns.length,
        currentSpeaker: this.turns[this.currentIndex]?.speaker || '',
      });
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.startChromeHeartbeat();
      this.synth.resume();
      this.onProgress?.({
        status: 'playing',
        currentTurnIndex: this.currentIndex + 1,
        totalTurns: this.turns.length,
        currentSpeaker: this.turns[this.currentIndex]?.speaker || '',
      });
    } else if (this.turns.length > 0 && this.currentIndex < this.turns.length) {
      this.startChromeHeartbeat();
      this.playTurn(this.currentIndex);
    }
  }

  public stop() {
    this.isCancelled = true;
    this.clearWatchdog();
    this.stopChromeHeartbeat();
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    if (this.synth) {
      this.synth.cancel();
    }
    delete (window as any).__currentActiveUtterance;
  }
}

export const ttsEngine = new TTSEngine();
