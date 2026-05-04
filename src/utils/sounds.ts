let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function playCardPlay() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;
    const osc = ac.createOscillator();
    const og = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = 520;
    og.gain.setValueAtTime(0.3, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(og); og.connect(ac.destination);
    osc.start(t); osc.stop(t + 0.09);
  } catch { /* blocked by user gesture policy */ }
}

export function playCardReveal(index = 0) {
  try {
    const ac = getCtx();
    const t = ac.currentTime + index * 0.38;
    const osc = ac.createOscillator();
    const og = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = 660 + index * 60;
    og.gain.setValueAtTime(0.25, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(og); og.connect(ac.destination);
    osc.start(t); osc.stop(t + 0.08);
  } catch { /* blocked */ }
}

export function playLPDamage() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;

    // Low impact thud
    const osc = ac.createOscillator();
    const og = ac.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.18);
    og.gain.setValueAtTime(0.6, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(og); og.connect(ac.destination);
    osc.start(t); osc.stop(t + 0.2);

    // Distortion crackle
    const nbuf = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.05), ac.sampleRate);
    const nd = nbuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1) * (1 - i / nd.length);
    const nsrc = ac.createBufferSource();
    nsrc.buffer = nbuf;
    const ng = ac.createGain(); ng.gain.value = 0.2;
    nsrc.connect(ng); ng.connect(ac.destination);
    nsrc.start(t);
  } catch { /* blocked */ }
}

export function playVictory() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;

    // Ascending fanfare
    const melody = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5];
    melody.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const og = ac.createGain();
      osc.type = i < 3 ? "square" : "sawtooth";
      osc.frequency.value = freq;
      const s = t + i * 0.09;
      og.gain.setValueAtTime(0.14, s);
      og.gain.exponentialRampToValueAtTime(0.001, s + 0.55);
      osc.connect(og); og.connect(ac.destination);
      osc.start(s); osc.stop(s + 0.6);
    });

    // Final chord
    [523.25, 659.25, 783.99].forEach((freq) => {
      const osc = ac.createOscillator();
      const og = ac.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const s = t + 0.7;
      og.gain.setValueAtTime(0.1, s);
      og.gain.exponentialRampToValueAtTime(0.001, s + 1.2);
      osc.connect(og); og.connect(ac.destination);
      osc.start(s); osc.stop(s + 1.3);
    });
  } catch { /* blocked */ }
}
