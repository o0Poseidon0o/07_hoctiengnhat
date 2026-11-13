'use client';

import { Volume2 } from 'lucide-react';
import { useState } from 'react';

export function speakJapanese(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const clean = text.replace(/[～〜（）()]/g, '').trim();
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = 'ja-JP';
  utter.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ja'));
  if (jaVoice) utter.voice = jaVoice;
  utter.onend = () => onEnd?.();
  utter.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utter);
}

export function SpeakButton({
  text,
  label = 'Nghe phát âm',
  size = 'sm',
}: {
  text: string;
  label?: string;
  size?: 'sm' | 'md';
}) {
  const [speaking, setSpeaking] = useState(false);

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        setSpeaking(true);
        speakJapanese(text, () => setSpeaking(false));
      }}
      className={`inline-flex items-center justify-center rounded-lg border transition ${
        size === 'md' ? 'h-9 w-9' : 'h-7 w-7'
      } ${
        speaking
          ? 'border-[#c83e2b] bg-[#c83e2b]/10 text-[#c83e2b]'
          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
      }`}
    >
      <Volume2 className={size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
    </button>
  );
}

