// Simple Web Audio API sound effect synthesizer to give kids instant reward feedback
// Plays without loading external audio assets, works immediately in the browser

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Nice high pitch ding-ding chimes
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode1 = ctx.createGain();
    const gainNode2 = ctx.createGain();
    
    osc1.connect(gainNode1);
    gainNode1.connect(ctx.destination);
    
    osc2.connect(gainNode2);
    gainNode2.connect(ctx.destination);
    
    // First chime
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
    gainNode1.gain.setValueAtTime(0.15, now);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    // Second chime slightly delayed
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.2); // C6
    gainNode2.gain.setValueAtTime(0.15, now + 0.08);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    
    osc1.start(now);
    osc1.stop(now + 0.35);
    
    osc2.start(now + 0.08);
    osc2.stop(now + 0.5);
  } catch (e) {
    console.warn('AudioContext not supported or blocked by user action.', e);
  }
}

export function playIncorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Slur-down warning sound
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.linearRampToValueAtTime(147, now + 0.25); // D3
    
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.warn('AudioContext not supported or blocked.', e);
  }
}

export function playVictorySound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Arpeggio up!
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale arpeggio
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      
      gain.gain.setValueAtTime(0.12, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.25);
      
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.3);
    });
  } catch (e) {
    console.warn('Victory audio failed', e);
  }
}

export function playStarSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.12); // D6
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {
    console.warn('Star sound failed', e);
  }
}
