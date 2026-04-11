'use client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SoundType = 'click' | 'boot' | 'notification';

// ---------------------------------------------------------------------------
// Module-level volume — OSContext writes here via setAudioVolume().
// No window global hacks. Default 50 %.
// ---------------------------------------------------------------------------
let _volume = 0.5;

/** Called by OSProvider whenever the user moves the volume slider. */
export const setAudioVolume = (normalized: number) => {
  _volume = Math.max(0, Math.min(1, normalized));
};

// ---------------------------------------------------------------------------
// Main engine
// ---------------------------------------------------------------------------
export const playSound = (type: SoundType) => {
  if (typeof window === 'undefined') return;

  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.value = _volume;
  masterGain.connect(ctx.destination);

  switch (type) {
    case 'click': {
      // Soft, modern Apple-style click pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
      break;
    }

    case 'boot': {
      // Majestic Mac boot chord — C major (C4, E4, G4) with slow fade-in/out
      const playNote = (freq: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 3);
      };

      playNote(261.63); // C4
      playNote(329.63); // E4
      playNote(392.00); // G4
      break;
    }

    case 'notification': {
      // Elegant double bloop
      const playBloop = (freq: number, offset: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);
        gain.gain.setValueAtTime(0.8, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.2);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.2);
      };

      playBloop(600, 0);
      playBloop(800, 0.15);
      break;
    }
  }
};
