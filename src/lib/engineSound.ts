let ctx: AudioContext | null = null;
let activeNodes: { stop: () => void } | null = null;

function getContext(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  } catch {
    return null;
  }
}

function makeNoiseBuffer(context: AudioContext) {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // brown-ish noise for a smoother, less hissy rush
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.2;
  }
  return buffer;
}

/**
 * Plays a synthesized jet-engine/takeoff whoosh, enveloped over `totalMs`.
 * Fully procedural — no external audio asset, no licensing concerns.
 * Fails silently if Web Audio is unavailable or blocked by the browser.
 */
export function playEngineSound(totalMs: number) {
  stopEngineSound();

  const context = getContext();
  if (!context) return;

  try {
    const now = context.currentTime;
    const total = totalMs / 1000;
    const attack = Math.min(0.35, total * 0.25);
    const release = Math.min(0.45, total * 0.3);

    const master = context.createGain();
    master.gain.setValueAtTime(0, now);
    master.connect(context.destination);

    // filtered noise = turbine / air rush
    const noise = context.createBufferSource();
    noise.buffer = makeNoiseBuffer(context);
    noise.loop = true;

    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.Q.value = 0.7;
    bandpass.frequency.setValueAtTime(220, now);
    bandpass.frequency.linearRampToValueAtTime(900, now + total * 0.7);
    bandpass.frequency.linearRampToValueAtTime(500, now + total);

    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.5;

    noise.connect(bandpass).connect(noiseGain).connect(master);

    // low rumble = engine body
    const rumble = context.createOscillator();
    rumble.type = "sawtooth";
    rumble.frequency.setValueAtTime(48, now);
    rumble.frequency.linearRampToValueAtTime(95, now + total * 0.75);
    rumble.frequency.linearRampToValueAtTime(70, now + total);

    const rumbleFilter = context.createBiquadFilter();
    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.value = 320;

    const rumbleGain = context.createGain();
    rumbleGain.gain.value = 0.35;

    rumble.connect(rumbleFilter).connect(rumbleGain).connect(master);

    // envelope: subtle fade-in, gentle rise, smooth fade-out before nav
    const peak = 0.16;
    master.gain.linearRampToValueAtTime(peak, now + attack);
    master.gain.linearRampToValueAtTime(peak * 1.15, now + total - release);
    master.gain.linearRampToValueAtTime(0, now + total);

    noise.start(now);
    rumble.start(now);
    noise.stop(now + total + 0.05);
    rumble.stop(now + total + 0.05);

    activeNodes = {
      stop: () => {
        try {
          const t = context.currentTime;
          master.gain.cancelScheduledValues(t);
          master.gain.linearRampToValueAtTime(0, t + 0.15);
          noise.stop(t + 0.2);
          rumble.stop(t + 0.2);
        } catch {
          /* already stopped */
        }
      },
    };
  } catch {
    // Autoplay/security restrictions or unsupported browser — fail silently.
    activeNodes = null;
  }
}

export function stopEngineSound() {
  if (activeNodes) {
    activeNodes.stop();
    activeNodes = null;
  }
}
