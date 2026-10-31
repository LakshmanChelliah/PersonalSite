"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger, onScroll } from "animejs";
export function MotionShell({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (!self || self.matches.reduce) return;
      animate(".hero-word", {
        y: [12, 0],
        delay: stagger(80),
        duration: 850,
        ease: "outExpo",
      });
      animate(".orbit-drawing", {
        rotate: [0, 360],
        duration: 95000,
        loop: true,
        ease: "linear",
      });
      root.current
        ?.querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => {
          animate(el, {
            y: [30, 0],
            duration: 850,
            ease: "outQuart",
            autoplay: onScroll({
              target: el,
              enter: "bottom-=60 top",
              repeat: false,
            }),
          });
        });
    });
    return () => scope.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}
