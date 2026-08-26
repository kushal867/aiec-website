let current: HTMLAudioElement | null = null;

/**
 * Plays the page-flip sample for in-app "turn to a new section" navigation
 * (the fullscreen menu). Kept separate from the synthesized jet-engine sound,
 * which is reserved for flying to a specific destination.
 */
export function playPageFlip(volume = 0.35) {
  try {
    if (current) {
      current.pause();
      current.currentTime = 0;
    }
    const audio = new Audio("/sounds/page-flip.mp3");
    audio.volume = volume;
    current = audio;
    void audio.play().catch(() => {
      // Autoplay/interaction restrictions — fail silently, never block navigation.
    });
  } catch {
    // Unsupported browser or blocked audio — fail silently.
  }
}
