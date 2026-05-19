// ─── Voice cache ─────────────────────────────────────────────────────────────
let _voiceCache = null;

export function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      _voiceCache = voices;
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        _voiceCache = window.speechSynthesis.getVoices();
        resolve(_voiceCache);
      };
    }
  });
}

// ─── Pick the best available Japanese voice ───────────────────────────────────
// Priority: Google 日本語 (Neural) > Microsoft Keita/Haruka (Neural) >
//           any ja-JP "premium"/"enhanced" > any ja-JP > fallback
function pickBestJapaneseVoice(voices) {
  const ja = voices.filter(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));

  const tiers = [
    // Tier 1 – Google Neural / Premium
    v => /google/i.test(v.name) && /日本語|japanese|Japan/i.test(v.name),
    v => /google/i.test(v.name) && v.lang.startsWith('ja'),
    // Tier 2 – Microsoft Neural
    v => /microsoft/i.test(v.name) && /keita|haruka/i.test(v.name),
    v => /microsoft/i.test(v.name) && v.lang.startsWith('ja'),
    // Tier 3 – any "premium" / "enhanced" label
    v => /(premium|enhanced|neural)/i.test(v.name) && v.lang.startsWith('ja'),
    // Tier 4 – any Japanese
    v => v.lang.startsWith('ja'),
  ];

  for (const test of tiers) {
    const match = ja.find(test);
    if (match) return match;
  }
  return null;
}

// ─── Main TTS function ────────────────────────────────────────────────────────
export async function speakJapanese(text, onEnd) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const voices = _voiceCache || await loadVoices();
  const voice = pickBestJapaneseVoice(voices);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';

  if (voice) {
    utterance.voice = voice;
    // Google voices sound best slightly slower; Microsoft prefer near-normal speed
    const isGoogle = /google/i.test(voice.name);
    const isMicrosoft = /microsoft/i.test(voice.name);
    utterance.rate  = isGoogle ? 0.88 : isMicrosoft ? 0.92 : 0.85;
    utterance.pitch = isGoogle ? 1.05 : isMicrosoft ? 1.0  : 1.0;
  } else {
    // No Japanese voice found — set neutral settings
    utterance.rate  = 0.85;
    utterance.pitch = 1.0;
  }

  utterance.volume = 1.0;
  if (onEnd) utterance.onend = onEnd;

  // Chrome bug: long utterances get cut off — use a keep-alive ping
  window.speechSynthesis.speak(utterance);

  // Keep-alive for Chrome (pauses synthesis after ~15 s without this)
  let keepAlive;
  utterance.onstart = () => {
    keepAlive = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(keepAlive);
        return;
      }
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);
  };
  utterance.onend = () => {
    clearInterval(keepAlive);
    onEnd?.();
  };
  utterance.onerror = () => clearInterval(keepAlive);
}

// ─── Speech recognition ───────────────────────────────────────────────────────
export function startRecognition(onResult, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError?.('Speech recognition not supported');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  recognition.onresult = (event) => {
    const results = [];
    for (let i = 0; i < event.results[0].length; i++) {
      results.push({
        transcript: event.results[0][i].transcript,
        confidence: event.results[0][i].confidence,
      });
    }
    onResult?.(results);
  };

  recognition.onerror = (event) => onError?.(event.error);
  recognition.start();
  return recognition;
}

// ─── Pre-warm voices on module load (so they're ready before first click) ─────
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices().catch(() => {});
}