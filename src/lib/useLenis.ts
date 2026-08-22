import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      history.pushState(null, "", href);
    }
    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);
}
