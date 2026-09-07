import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      lenisInstance = null;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -72,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      history.pushState(null, "", href);
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/**
 * Scroll to the top of the page, staying in sync with Lenis's internal
 * scroll-target state (a raw window.scrollTo would get fought/overridden
 * on the next animation frame if Lenis is active).
 */
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}
