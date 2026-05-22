import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Full-screen intro: a counter ticks 0 → 100 while corner taglines slide in,
 * then the whole panel wipes upward to reveal the hero. Mirrors the original
 * Duyu preloader (percentage + "Restore Your Thyroid Health" copy).
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.15,
          onComplete,
        });
      },
    });

    if (reduced) {
      setPct(100);
      tl.to({}, { duration: 0.2 });
      return () => {
      tl.kill();
    };
    }

    tl.from('[data-pre-fade]', {
      yPercent: 120,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
    }).to(
      counter,
      {
        v: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => setPct(Math.round(counter.v)),
      },
      0.1
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-charcoal px-6 py-8 text-cream md:px-12 md:py-12"
    >
      <div className="flex items-start justify-between">
        <span data-pre-fade className="font-serif text-2xl italic">
          Duyu Care
        </span>
        <span data-pre-fade className="eyebrow opacity-70">
          Est. 2020
        </span>
      </div>

      <div className="flex items-end justify-center">
        <span
          data-pre-fade
          className="font-serif text-[20vw] leading-none tracking-tight md:text-[14vw]"
        >
          {pct}
        </span>
        <span className="mb-[3vw] ml-2 font-serif text-3xl italic opacity-70">%</span>
      </div>

      <div className="flex items-end justify-between">
        <p data-pre-fade className="max-w-[10rem] text-sm leading-snug opacity-80">
          Start Your Best
          <br />
          Good Habit
        </p>
        <p
          data-pre-fade
          className="max-w-[10rem] text-right text-sm leading-snug opacity-80"
        >
          Restore Your
          <br />
          Thyroid Health
        </p>
      </div>
    </div>
  );
}
