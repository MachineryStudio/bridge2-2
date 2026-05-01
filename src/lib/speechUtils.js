// Japanese TTS
export function speakJapanese(text, onEnd) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  
  const voices = window.speechSynthesis.getVoices();
  const japaneseVoice = voices.find(v => v.lang.startsWith('ja'));
  if (japaneseVoice) utterance.voice = japaneseVoice;
  if (onEnd) utterance.onend = onEnd;
  
  window.speechSynthesis.speak(utterance);
}

// Speech recognition for pronunciation practice
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
  
  recognition.onerror = (event) => {
    onError?.(event.error);
  };
  
  recognition.start();
  return recognition;
}

export function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
}